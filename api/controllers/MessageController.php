<?php
namespace Api\Controllers;
use Api\Database\DB;
use Api\Http\Request;
use Api\Models\Message;
use Api\Models\Seen;
use Api\Providers\Auth;
use Api\Providers\Utilities;

require_once "BaseController.php";
class MessageController extends BaseController
{
    /**
     * @throws \Exception
     */
    public static function sendMessage(Request $request)
    {
        self::setTimeZone();
        $message = $request->input("message");
        $ctrlNo = $request->input('ctrl_no');
        Utilities::validate(
            "message",
            $message,
            "required | max_len:255 | min_len:1 | string",
            array(
                "required" => "Message is required",
                "max_len" => "Message is too long",
                "min_len" => "Message is too short",
                "string" => "Message must be a string"
            )
        );

        $appIdRst = DB::raw("SELECT id FROM db201_file.applications WHERE ctrl_no = ?", array($ctrlNo), 'mysql');
        if(count($appIdRst) <= 0) response(array("errors" => array("Control #$ctrlNo does not exist")));

        $auth = new Auth();

        $messageModel = new Message();
        $messageModel->emp_no = $auth->getEmpNo();
        $messageModel->application_id = $appIdRst[0]['id'];
        $messageModel->message = $message;
        $messageModel->date_created = date('Y-m-d H:i:s');
        $rst = $messageModel->create();

        if($rst->properties->affected_rows > 0){
            response(array(
                "messages" => self::getMessages($auth->getEmpNo(), $appIdRst[0]['id'])
            ));
        }
        response(array("errors" => array("Something went wrong.")), 500);
    }

    public static function setSeen(Request $request)
    {
        self::setTimeZone();
        $ctrlNo = $request->input("ctrl_no");
        $auth = new Auth();
        Utilities::validate(
            "Control #",
            $ctrlNo,
            "required | string | max_len:10 | min_len:10 | string | exists:db201_file.applications,ctrl_no",
            array(
                "required" => "Control #$ctrlNo is required",
                "max_len" => "Control #$ctrlNo is too long",
                "min_len" => "Control #$ctrlNo is too short",
                "string" => "Control #$ctrlNo must be a string",
                "exists" => "Control #$ctrlNo does not exists",
            )
        );
        list($appId) = DB::raw("SELECT id FROM db201_file.applications WHERE ctrl_no = ?", array($ctrlNo), 'mysql');
        list($seenCnt) = DB::raw("SELECT COUNT(*) AS cnt FROM db201_file.seens WHERE application_id = ? AND emp_no = ?", array($appId['id'], $auth->getEmpNo()), 'mysql');
        $seen = new Seen();
        if($seenCnt['cnt'] <= 0){
            $seen->emp_no = $auth->getEmpNo();
            $seen->application_id = $appId['id'];
            $seen->create();
        }else{
            $seen->timestamp = date('Y-m-d H:i:s');
            $seen->where("application_id", '=',  $appId['id'])->andWhere('emp_no', '=', $auth->getEmpNo())->commit();
        }
        response(array("message" => "success"));
    }
    public static function getMessages($empNo, $appId)
    {
        return DB::raw("SELECT m.*,
                CASE WHEN(m.emp_no = ?)
                  THEN true
                  ELSE false
                END AS sender,
                t.id AS image_id,
                CONCAT(t.lname, ', ', t.fname, ' ', t.mname) AS full_name
                FROM db201_file.messages m JOIN aduollms.teachers t ON m.emp_no = t.emp_no WHERE m.application_id = ?", array($empNo, $appId), 'mysql');
    }
}