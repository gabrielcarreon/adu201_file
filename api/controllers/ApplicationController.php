<?php
namespace Api\Controllers;
use Api\Database\DB;
use Api\Http\Request;
use Api\Models\AppAttachment;
use Api\Models\Application;
use Api\Models\ApplicationField;
use Api\Providers\Auth;
use Api\Providers\FileProvider;
use Api\Providers\Utilities;

require_once 'BaseController.php';
class ApplicationController extends BaseController
{

    private static $entries = array();
    private static $requiredAttachments = array();
    public function __construct()
    {
        if(!isset($_SESSION)) session_start();
    }

    public static function apply(Request $request)
    {
        $auth = new Auth();
        BaseController::setTimeZone();
        $validation = self::processValidation($request->all());
        $requestFiles = $request->files();

        $requiredAttachments = $validation->required;
        $entries = $validation->entries;

        foreach ($requiredAttachments as $requiredAttachment){
            $uploaded = false;
            foreach ($request->input('files') as $uploadedFile){
                if($uploadedFile['attachment_id'] == $requiredAttachment['attachment_id']){
                    $uploaded = true;
                }
            }
            if(!$uploaded) response(array("errors" => array("A required file is missing. Please upload the required file."), 403));
        }

        $inputFiles = $request->input('files');
        if($inputFiles){
            $uploadedFiles = FileProvider::repackFile($requestFiles, $inputFiles);
        }

        //after validation, process application
        try{
            //generate formatted control number
            $ctrlNo = self::generateCtrlNum();
            $application = new Application();
            $application->emp_no = $auth->getEmpNo();
            $application->date_created = date('Y-m-d H:i:s');
            $application->ctrl_no = $ctrlNo;
            $rst = $application->create();
            unset($application);

            $lid = $rst->properties->insert_id;
            if($lid == 0){
                response(array("errors" => array("Error code: AC-60")), 500);
            }
            $forApproval = false;
            $partitions = array();
            foreach ($entries as $entry){
                if($entry->partition['type'] == 'select-group' && $entry->partition['part'] == 'text'){
                    $partitions[$entry->partition['id']] = $entry->val;
                }else{
                    $fields = new ApplicationField();
                    $fields->application_id = $lid;
                    $fields->field_id = $entry->field_id;
                    $fields->value = $entry->partition['type'] == 'select-group' && $entry->partition['part'] == 'selection'
                        ? $partitions[$entry->partition['id']]
                        : $entry->val;
                    $fields->is_for_approval = $entry->is_for_approval === "1" ? 1 : 0;
                    $fields->is_approved = $entry->is_for_approval === "0" ? 1 : 0;
                    $fields->partition = $entry->partition['id'];
                    $fields->date_created = date('Y-m-d H:i:s');
                    $fields->create();
                }
                if($entry->is_for_approval === "1"){
                    $forApproval = true;
                }
            }

            if(!$forApproval){
                $application = new Application();
                $application->status = 'done';
                $application->where('ctrl_no', '=', $ctrlNo)->commit();
            }


            foreach ($uploadedFiles as $file){
                $encrypted_file_name = FileProvider::handleFile($file, array(), FILE_PATH."/$lid");
                $attachments = new AppAttachment();
                $attachments->application_id = $lid;
                $attachments->attachment_id = 0;
                $attachments->file_name = $file['name'];
                $attachments->encrypted_file_name = $encrypted_file_name;
                $attachments->date_created = date('Y-m-d H:i:s');
                $attachments->file_type = $file['type'];
                $attachments->attachment_id = $file['attachment_id'];
                $attachments->create();
            }

            response(array("status" => "OK"));
        }catch (\Exception $exception){
            response(array("errors" => array("Error code: AC-86")), 500);
        }

        response(array("success" => "OK"));
    }

    private static function determineDynamicEntryValidation($input, $fieldId){
        //if type is selection, validation id will be the input
        if(preg_match("/_selection/i", $fieldId)) return (object) array(
            "condition" => "value",
            "validation" => $input->val
        );
        //if type is info, validation will be text
        if(preg_match("/_info/i", $fieldId)) return (object) array(
            "condition" => "use",
            "validation" => "string | max_len:255 | required"
        );

        if(preg_match("/new_/i", $fieldId)) return (object) array(
            "condition" => "value",
            "validation" => substr($fieldId, 4)
        );

        //if none match, return default field id
        return (object) array(
            "condition" => "ignore",
            "validation" => $fieldId
        );
    }

    private static function validateEntries($input, $fieldId){
        $inputObj = (object) $input;
        try{
            if($inputObj->changed == 'true'){
                $upperFieldId = ucwords($fieldId);
                $validationRst = self::determineDynamicEntryValidation($inputObj, $fieldId);
                switch ($validationRst->condition) {
                    case "value":
                    case "ignore":
                        $validation = DB::raw("SELECT id, validation FROM db201_file.fields WHERE field_id = ?", array($validationRst->validation), 'mysql');
                        $validationField = $validation[0]['validation'];
                        $fieldId = $validationRst->validation;
                        break;
                    case "use":
                        $validationField = $validationRst->validation;
                        break;
                    default:
                        throw new \Exception("Invalid validation rule");
                }

                Utilities::validate($fieldId, $inputObj->val, $validationField, array(
                    "float" => "$upperFieldId must be a number.",
                    "double" => "$upperFieldId must be a number.",
                    "string" => "$upperFieldId must be a text.",
                    "max_len" => "$upperFieldId character count is too long!",
                ));

                $requiredAttachment = DB::raw("SELECT a.*, f.field_name FROM db201_file.field_attachments fa
                        JOIN db201_file.attachments a ON fa.attachment_id = a.id
                        JOIN db201_file.fields f ON fa.fields_id = f.id WHERE f.field_id = ?", array($validationRst->validation), 'mysql');

                $inputObj->field_id = $fieldId;
                self::$entries[] = $inputObj;
                foreach ($requiredAttachment as $attachment){
                    self::$requiredAttachments[] = $attachment;
                }
            }
        }catch (\Exception $exception){
            debug($exception);
        }
    }

    private static function processValidation($request){
        foreach ($request as $fieldId => $input){
            //if entry is file, ignore
            if($fieldId == 'files') continue;

            //if entry is single input then validate, else iterate through inputs before validating
            @list($prefix) = explode("_", $fieldId);
            if (isset($input['changed'])){
                self::validateEntries($input, $fieldId);
            }else{
                foreach ($input as $multiEntryInput){
                    self::validateEntries($multiEntryInput, $fieldId);
                }
            }
        }
        return (object)array(
            "required" => self::$requiredAttachments,
            "entries" => self::$entries
        );
    }

    private static function generateCtrlNum ()
    {
        $rst = DB::raw("SELECT COUNT(*) AS count FROM db201_file.applications WHERE DATE_FORMAT(date_created, '%Y%m') >= DATE_FORMAT(NOW(), '%Y%m')",array(), 'mysql');
        //get current year and month
        $year = date('Y');
        $month = date('m');
        if (is_null($rst[0]['count'])) {
            return $year . $month . str_pad(1, 4, "0", STR_PAD_LEFT);
        }
        $newMax = substr($rst[0]['count'], -4);
        return $year . $month . str_pad($newMax + 1, 4, "0", STR_PAD_LEFT);
    }
    public static function applications(Request $request)
    {
        $auth = new Auth();
        $query = "SELECT a.emp_no, a.status, a.ctrl_no, t.id AS image_id, CONCAT(t.lname, ', ', t.fname, ' ', t.mname) AS full_name,
                    (SELECT COUNT(*) FROM db201_file.messages m WHERE date_created > (SELECT
                    (CASE
                        WHEN (SELECT COUNT(id) FROM db201_file.seens s WHERE s.emp_no = ? AND s.application_id = a.id) > 0
                        THEN (SELECT timestamp FROM db201_file.seens s WHERE s.emp_no = ? AND s.application_id = a.id ORDER BY id DESC LIMIT 1)
                        ELSE '0000-00-00 00:00:00'
                    END)) AND m.emp_no != ? AND m.application_id = a.id) AS message_cnt
                    FROM db201_file.applications a
                    JOIN aduollms.teachers t ON a.emp_no = t.emp_no";
        $params = array($auth->getEmpNo(), $auth->getEmpNo(), $auth->getEmpNo());
        if(($auth->getAccessType() != 'hr' && $auth->getAccessType() != 'admin') || $request->query('user') == '1'){
            $query.=" WHERE a.emp_no = ? ";
            $params[] = $auth->getEmpNo();
        }
        $query.=" ORDER BY CASE 
                    WHEN a.status = 'pending' THEN 1
                    WHEN a.status = 'done' THEN 2
                    WHEN a.status = 'declined' THEN 3
                    WHEN a.status = 'cancelled' THEN 4
                END, a.date_created DESC";
        $rst = DB::raw($query, $params, 'mysql');
        response(array("status" => "OK", "applications" => $rst));
    }

    public static function applicationInfo(Request $request)
    {
        $auth = new Auth();
        $accessType = $auth->getAccessType();
        $ctrlNo = $request->query('ctrl_no');
        $appInfoQuery = (object) array(
            "query" => "SELECT a.*, t.emailadd, t.id AS image_id, t.fname, t.mname, t.lname 
                    FROM db201_file.applications a JOIN aduollms.teachers t ON a.emp_no = t.emp_no WHERE ctrl_no = ?",
            "params" => array($ctrlNo)
        );

        //if request did not came from hr or admin, require query to include emp_no
        if($accessType != 'hr' && $accessType != 'admin'){
            $appInfoQuery->query.= " AND a.emp_no = ?";
            $appInfoQuery->params[] = $auth->getEmpNo();
        }

        try{
            $appInfo = DB::raw($appInfoQuery->query, $appInfoQuery->params, 'mysql');

            $appId = $appInfo[0]['id'];
            $appFields = DB::raw("SELECT af.*, f.data_type, f.descript, f.field_name FROM db201_file.application_fields af JOIN db201_file.fields f ON af.field_id = f.field_id WHERE application_id = ?", array($appId), 'mysql');
            $appAttachments = DB::raw("SELECT aa.encrypted_file_name, aa.file_name, aa.file_name, aa.file_type, a.descript
                FROM db201_file.application_attachments aa 
                JOIN db201_file.attachments a ON aa.attachment_id = a.attachment_id
                WHERE aa.application_id = ?", array($appId), 'mysql');
            $unreadCount = DB::raw("SELECT COUNT(*) AS unread_cnt FROM db201_file.messages m WHERE date_created > (SELECT
                                      (CASE
                                        WHEN (SELECT COUNT(id) FROM db201_file.seens s WHERE s.emp_no = ? AND s.application_id = ? ORDER BY id DESC) > 0
                                        THEN (SELECT timestamp FROM db201_file.seens s WHERE s.emp_no = ? AND s.application_id = ? ORDER BY id DESC LIMIT 1)
                                        ELSE '0000-00-00 00:00:00'
                                      END)) AND m.emp_no != ? AND m.application_id = ?",
                array($auth->getEmpNo(), $appId, $auth->getEmpNo(), $appId, $auth->getEmpNo(), $appId), 'mysql');
            $messages = MessageController::getMessages($auth->getEmpNo(), $appId);
        }catch (\Exception $error){
            response(array("message"=> array("View application failed!")), 500);
        }

        response(array(
            "app_info" => $appInfo[0],
            "app_fields" => $appFields,
            "app_attachments" => $appAttachments,
            "unread_cnt" => $unreadCount[0]['unread_cnt'],
            "messages" => $messages
        ));

    }

    public static function hrSubmitChanges(Request $request)
    {
        $auth = new Auth();
        Utilities::validate($request->input('ctrl_no'), $request->input('ctrl_no'), 'field_exists: db201_file.applications,ctrl_no', array('exists' => "Application does not exist"));
        foreach ($request->input('fields') as $field){
            $rst = DB::raw("SELECT * FROM db201_file.fields WHERE field_id = ?", array($field['field_id']), 'mysql');
            if(count($rst) == 0){
                response(array("error" => "Field does not exist"), 400);
            }
            Utilities::validate($field['field_id'], $field['value'], $rst[0]['validation'], array());
        }
        $rst = DB::raw("SELECT id, status FROM db201_file.applications WHERE ctrl_no = ?", array($request->input('ctrl_no')), 'mysql');
        if($rst[0]['status'] != 'pending'){
            response(array("errors" => array("Application has already been approved or declined")), 400);
        }
        $application = new Application();
        $application->status = 'done';
        $application->processed_by = $auth->getEmpNo();
        $application->where('ctrl_no', '=', $request->input('ctrl_no'))->commit();
        foreach ($request->input('fields') as $field){
            $fields = new ApplicationField();
            $fields->is_approved = $field['is_approved'] === "1" ? 1 : 0;
            $fields->where('is_approved', '=', 0)
                ->andWhere('application_id', '=', $rst[0]['id'])
                ->andWhere('is_for_approval', '=', 1)
                ->andWhere('field_id', '=', $field['field_id'])
                ->commit();
        }
        response(array("status" => "OK"));
    }

    public static function cancelApplication(Request $request)
    {
        $ctrlNo = $request->input('ctrl_no');
        $auth = new Auth();
        $empNo = $auth->getEmpNo();
        $application = new Application();
        $application->status = 'cancelled';
        $application->processed_by = $auth->getEmpNo();
        $rst = $application->where('ctrl_no', '=', $ctrlNo)
            ->andWhere('emp_no', '=', $empNo)
            ->andWhere('status', '=', 'pending')
            ->commit();
        if($rst->properties->affected_rows > 0){
            response(array("status" => "OK"));
        }
        response(array("errors" => array("Application cancel failed!")), 400);
    }
}