<?php
namespace Api\Controllers;
use Api\Database\DB;
use Api\Http\Request;
use Api\Providers\Auth;
use Api\Providers\FileProvider;

require_once "BaseController.php";
class AttachmentController extends BaseController
{
    /**
     * @throws \Exception
     */
    public static function index(Request $request)
    {
        $auth = new Auth();
        $accessType = $auth->getAccessType();
        $query = "SELECT aa.encrypted_file_name, a.id AS id FROM db201_file.applications a
            LEFT JOIN db201_file.application_attachments aa
            ON a.id = aa.application_id
            WHERE ctrl_no = ? AND aa.encrypted_file_name = ?";
        $params = array($request->input("ctrl_no"), $request->input('file'));
        if($accessType != 'hr'){
            $empNo = $auth->getEmpNo();
            $query.=" AND emp_no = ?";
            $params[] = $empNo;
        }
        $rst = DB::raw($query, $params, 'mysql');
        FileProvider::getFile($rst[0]['encrypted_file_name'], $rst[0]['id'], $rst[0]['file_name']);
    }
}