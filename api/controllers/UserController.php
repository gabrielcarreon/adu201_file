<?php

namespace Api\Controllers;

use Api\Database\DB;
use Api\Models\Teacher;
use Api\Models\User;
use Api\Providers\Auth;

require_once 'BaseController.php';
require_once './php/dummy.php';
class UserController extends BaseController
{
    public function __construct()
    {
        // BaseController::checkAuth();
    }
    public static function user201()
    {
        if(!isset($_SESSION)) session_start();

        if(DEBUG){
            response(array("message" => json_decode(DUMMY)));
        }

        $empNo = !APITEST
            ? $_SESSION['AdUOLLMSidno2']
            : '2022070096';

        $fCodeMap = array(
            "Mother" => "('30M')",
            "Father" => "('30F')",
            "Child" => "('20')",
            "Spouse" => "('10')",
            "Sibling" => "('40')"
        );

        $fields = DB::raw("SELECT f.id AS primary_key, f.field_id, g.group_id, f.is_for_approval, f.descript, f.table_name, f.field_name, f.is_multiple_entries, f.data_type, sg.sub_group_id, g.descript AS group_name, sg.descript AS sub_group_name FROM db201_file.fields f 
            LEFT JOIN db201_file.groups g ON f.group_id = g.id 
            LEFT JOIN db201_file.sub_groups sg ON f.sub_group_id = sg.id ORDER BY f.group_id, f.sub_group_id, f.order", array(), 'mysql');

        $empCid = "";
        $response = array();
        $tempArray = array();
        foreach ($fields as $index => $field){
            switch ($field['table_name']){
                case "emp":
                    $rst = DB::raw("SELECT cid, $field[field_name] FROM aduhr.dbo.$field[table_name] WHERE emp_no = ?", array($empNo), 116);
                    $empCid = $rst[0]['cid'];

                    $attachment = DB::raw("SELECT descript, a.attachment_id FROM db201_file.attachments a 
                        JOIN db201_file.field_attachments fa ON a.id = fa.attachment_id
                        WHERE fa.fields_id = ?", array($field['primary_key']), 'mysql');

                    $field['attachments'] = $attachment;
                    $field['data'] = $rst[0][$field['field_name']];

                    @list($type, $origin) = explode("|",$field['data_type']);
                    if($origin && trim($type) == 'select'){
                        @list($origin, $query) = explode("in", $origin);
                        if($query && trim($origin) == 'table'){
                            $field['data_type'] = self::getSelectFromTable($query);
                        }
                    }

                    $response[$field['group_id']]['name'] = $field['group_name'];
                    $response[$field['group_id']]['id'] = $field['group_id'];

                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['id'] = $field['sub_group_id'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['name'] = $field['sub_group_name'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['is_multiple_entries'] = $field['is_multiple_entries'];

                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['data'][] = $field;
                    break;
                case "emp_fam_others":
                    $fCode = $fCodeMap[$field['descript']];

                    $rst = DB::raw("SELECT name AS '$field[descript]', cid FROM aduhr.dbo.$field[table_name] WHERE emp_id = ? AND fcode IN $fCode", array($empCid), 116);
                    $attachment = DB::raw("SELECT descript, a.attachment_id FROM db201_file.attachments a 
                        JOIN db201_file.field_attachments fa ON a.id = fa.attachment_id
                        WHERE fa.fields_id = ?", array($field['primary_key']), 'mysql');

                    foreach ($rst as $result){
                        $field['data'] = current($result);
                        $field['cid'] = $result['cid'];
                        $field['is_multiple_entries'] = 1;
                        $field['attachments'] = $attachment;
                        $tempArray[] = $field;
                    }

                    $response[$field['group_id']]['name'] = $field['group_name'];
                    $response[$field['group_id']]['id'] = $field['group_id'];

                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['id'] = $field['sub_group_id'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['name'] = $field['sub_group_name'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['is_multiple_entries'] = $field['is_multiple_entries'];

                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['fields']['family_info']['name'] = 'family';
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['fields']['family_info']['is_for_approval'] = 1;
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['fields']['family_info']['data_type'] = 'select-group';
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['fields']['family_info']['descript'] = 'Family member';
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['fields']['family_info']['main_data_type'] = 'text';
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['fields']['family_info']['selection'][] = array(
                        "field_id" => $field['field_id'],
                        "data_type" => $field['data_type'],
                        "label" => $field['descript'],
                        "attachments" => $attachment,
                    );

                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['data'][$field['field_id']] = $tempArray;
                    $tempArray = array();
                    break;
                case "emp_educ_h":
                case "emp_educ_l":
                case "emp_emp_h":
                    $rst = DB::raw("SELECT $field[field_name], cid FROM aduhr.dbo.$field[table_name] WHERE emp_id = ?", array($empCid), 116);

                    $entries = $field['is_multiple_entries'];

                    $attachment = DB::raw("SELECT descript, a.attachment_id FROM db201_file.attachments a 
                            JOIN db201_file.field_attachments fa ON a.id = fa.attachment_id
                            WHERE fa.fields_id = ?", array($field['primary_key']), 'mysql');

                    foreach ($rst as $result){
                        $field['data'] = current($result);
                        $field['cid'] = $result['cid'];
                        $field['is_multiple_entries'] = 1;
                        $field['attachments'] = $attachment;
                        $tempArray[] = $field;
                    }

                    $response[$field['group_id']]['name'] = $field['group_name'];
                    $response[$field['group_id']]['id'] = $field['group_id'];

                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['id'] = $field['sub_group_id'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['name'] = $field['sub_group_name'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['is_multiple_entries'] = $entries;
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['number_of_entries'] = count($rst);
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['fields'][] = array(
                        "field_id" => $field['field_id'],
                        "data_type" => $field['data_type'],
                        "label" => $field['descript'],
                        "attachments" => $attachment,
                        "is_for_approval" => $field['is_for_approval'],
                        "descript" => $field['descript'],
                    );
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['data'][$field['field_id']] = $tempArray;
                    $tempArray = array();
                    break;
            }
        }
       response(array("message" => $response));
    }

    /**
     * @throws \Exception
     */
    public static function user()
    {
        if(!isset($_SESSION)) session_start();
        $message = isset($_SESSION['AdUOLLMSidno2']) ? $_SESSION['AdUOLLMSidno2'] : "Not logged in";
        $teacher = new Teacher();
        $rst = $teacher->where("emp_no", "=", $message)->get(
            "fname, lname, mname, adamsonmail, emp_no, id"
        );

        $user = new User();
        $userAccess = $user->where("emp_no", "=", $message)->get();

        $auth = new Auth();
        $auth->setAccessType(count($userAccess) == 1 ? $userAccess[0]['user_access'] : 'user');
        response(array("message" => array(
            "user_info" => $rst,
            "access_info" => $auth->getAccessType()
        )));
    }

    /**
     * @throws \Exception
     */
    public static function createSession()
    {
        if(!isset($_SESSION['AdUOLLMSidno2'])){
            session_start();
        }
        if(isset($_SESSION['_csrf_token'])){
            response(array('message' => $_SESSION['_csrf_token']));
        }
        $_SESSION['_csrf_token'] = bin2hex(openssl_random_pseudo_bytes(32));
        response(array('message' => $_SESSION['_csrf_token']));
    }
    public static function checkAuth(){
        if(!isset($_SESSION)) session_start();
        if(isset($_SESSION['AdUOLLMSidno2'])) response(array('message' => $_SESSION['AdUOLLMSidno2']), 200);
        response(array("errors" => array("Not logged in")), 401);
    }

    private static function getSelectFromTable($query){
        $queryBuilder = "SELECT";
        $object = json_decode(trim($query));
        foreach($object->fields as $key => $value){
            $queryBuilder.=" $value,";
        }
        $queryBuilder = trim($queryBuilder, ",");
        $queryBuilder.=" FROM $object->table ORDER BY $object->order";
        $selectData = DB::raw($queryBuilder, $object->params, $object->db);
        $selectJson = '';
        foreach($selectData as $data){
            $selectJson .= '{"label" : "'.trim($data["label"]).'","value" : "'.trim($data["value"]).'"},';
        }
        $selectJson = rtrim($selectJson, ",");
        return "select|[$selectJson]";
    }
}