<?php

namespace Api\Controllers;

use Api\Database\DB;
use Api\Models\Teacher;
use Api\Models\User;
use Api\Models\Fields;

require_once 'BaseController.php';
require_once './database/DB.php';
require_once './models/Teacher.php';
require_once './models/Fields.php';
class UserController extends BaseController
{
    public function __construct()
    {
        // BaseController::checkAuth();
    }
    public static function user201()
    {
        if(!isset($_SESSION)) session_start();

        //!debug
        $empNo = '2022070096';
//        $empNo = $_SESSION['AdUOLLMSidno2'];

        $map = array();
        $fCodeMap = array(
            "Parents" => "('30M', '30F')",
            "Children" => "('20')",
            "Spouse" => "('10')",
            "Siblings" => "('40')"
        );

        $fields = DB::raw("SELECT g.group_id, f.descript, f.table_name, f.field_name, f.is_multiple_entries, f.data_type, sg.sub_group_id, g.descript AS group_name, sg.descript AS sub_group_name FROM db201_file.fields f 
            LEFT JOIN db201_file.groups g ON f.group_id = g.id 
            LEFT JOIN db201_file.sub_groups sg ON f.sub_group_id = sg.id ORDER BY f.group_id, f.sub_group_id, f.descript", array(), 'mysql');

        $empCid = "";
        $response = array();
        $queryPlaceholder = "";
        $currentTable = "emp";
        foreach ($fields as $index => $field){
            switch ($field['table_name']){
                case "emp":
                case "emp_fam_others":
                    if($field['table_name'] == "emp"){
                        $rst = DB::raw("SELECT cid, $field[field_name] FROM aduhr.dbo.$field[table_name] WHERE emp_no = ?", array($empNo), 116);
                        $empCid = $rst[0]['cid'];
                        $field['data'] = $rst[0][$field['field_name']];
                    }else{
                        $fCode = $fCodeMap[$field['descript']];
                        $rst = DB::raw("SELECT name FROM aduhr.dbo.$field[table_name] WHERE emp_id = ? AND fcode IN $fCode", array($empCid), 116);
                        $field['data'] = $rst;
                    }
                    $response[$field['group_id']]['name'] = $field['group_name'];
                    $response[$field['group_id']]['id'] = $field['group_id'];

                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['id'] = $field['sub_group_id'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['name'] = $field['sub_group_name'];
                    $response[$field['group_id']]['sub_groups'][$field['sub_group_id']]['data'][] = $field;
                    break;
                case "emp_educ_h":
                case "emp_educ_l":
                case "emp_emp_h":
                    if($currentTable == 'emp') $currentTable = $field['table_name'];
                    if($currentTable != $field['table_name'] || !isset($fields[$index + 1])){
                        if(!isset($fields[$index + 1])) $queryPlaceholder.= " $field[field_name] AS '$field[descript]',";
                        $queryPlaceholder = rtrim($queryPlaceholder, ',');
                        $rst =  DB::raw("SELECT $queryPlaceholder FROM aduhr.dbo.$currentTable WHERE emp_id = ?", array($empCid), 116);
                        $response[$fields[$index - 1]['group_id']]['name'] = $fields[$index - 1]['group_name'];
                        $response[$fields[$index - 1]['group_id']]['id'] = $fields[$index - 1]['group_id'];

                        $response[$fields[$index - 1]['group_id']]['sub_groups'][$fields[$index - 1]['sub_group_id']]['id'] = $fields[$index - 1]['sub_group_id'];
                        $response[$fields[$index - 1]['group_id']]['sub_groups'][$fields[$index - 1]['sub_group_id']]['name'] = $fields[$index - 1]['sub_group_name'];
                        $response[$fields[$index - 1]['group_id']]['sub_groups'][$fields[$index - 1]['sub_group_id']]['is_multiple_entries'] = $field['is_multiple_entries'];
                        $response[$fields[$index - 1]['group_id']]['sub_groups'][$fields[$index - 1]['sub_group_id']]['data'][] = $rst;
                        $queryPlaceholder = "";
                        $currentTable = $field['table_name'];
                    }

                    $queryPlaceholder.= " $field[field_name] AS '$field[descript]',";
                    $currentTable = $field['table_name'];
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
        $rst = $teacher->where("emp_no", "=", $message)->get();

        $user = new User();
        $userAccess = $user->where("emp_no", "=", $message)->get();

        response(array("message" => array(
            "user_info" => $rst,
            "access_info" => $userAccess
        )), 200);
    }

    /**
     * @throws \Exception
     */
    public static function createSession()
    {
        session_start();
        $_SESSION['_csrf_token'] = bin2hex(openssl_random_pseudo_bytes(32));
        response(array('message' => $_SESSION['_csrf_token']), 200);
    }
    public static function checkAuth(){
        if(!isset($_SESSION)) session_start();
        if(isset($_SESSION['AdUOLLMSidno2'])) response(array('message' => $_SESSION['AdUOLLMSidno2']), 200);
        response(array("message" => "Not logged in"), 401);
    }
}


//            if($field['sub_group_name'] == "") $field['sub_group_name'] = "NG";
//            switch ($field['table_name']){
//                case "emp":
//                    $rst = DB::raw("SELECT cid, $field[field_name] FROM aduhr.dbo.$field[table_name] WHERE emp_no = ?", array($empNo), 116);
//                    $empCid = $rst[0]['cid'];
//                    $field['data'] = $rst[0][$field['field_name']];
//                    $response[$field['group_name']][$field['sub_group_name']]['data'][] = $field;
//                    $response[$field['group_name']][$field['sub_group_name']]['sub_group'] = $field['sub_group_id'];
//                    break;
//                case "emp_fam_others":
//                    $fCode = $fCodeMap[$field['descript']];
//                    $rst = DB::raw("SELECT name FROM aduhr.dbo.$field[table_name] WHERE emp_id = ? AND fcode IN $fCode", array($empCid), 116);
//                    $field['data'] = $rst;
//                    $response[$field['group_name']][$field['sub_group_name']]['data'][] = $field;
//                    $response[$field['group_name']][$field['sub_group_name']]['sub_group'] = $field['sub_group_id'];
//                    break;
//                case "emp_educ_h":
//                case "emp_educ_l":
//                case "emp_emp_h":
//                    if($currentTable == 'emp') $currentTable = $field['table_name'];
//
//                    if($currentTable != $field['table_name'] || !isset($fields[$index + 1])){
//                        if(!isset($fields[$index + 1])) $queryPlaceholder.= " $field[field_name] AS '$field[descript]',";
//
//                        $queryPlaceholder = rtrim($queryPlaceholder, ',');
//                        $rst =  DB::raw("SELECT $queryPlaceholder FROM aduhr.dbo.$currentTable WHERE emp_id = ?", array($empCid), 116);
//                        $response[$fields[$index - 1]['group_name']][$fields[$index - 1]['sub_group_name'] != "" ? $fields[$index - 1]['sub_group_name'] : "NG"]["data"] = $rst;
//                        $response[$fields[$index - 1]['group_name']][$fields[$index - 1]['sub_group_name'] != "" ? $fields[$index - 1]['sub_group_name'] : "NG"]["multientry"] = $field['is_multiple_entries'];
//                        $response[$fields[$index - 1]['group_name']][$fields[$index - 1]['sub_group_name'] != "" ? $fields[$index - 1]['sub_group_name'] : "NG"]["sub_group"] = $field['is_multiple_entries']
//                            ? $fields[$index - 1]['sub_group_id']
//                            : $fields[$index - 1]['field_name'];
//                        $queryPlaceholder = "";
//                        $currentTable = $field['table_name'];
//                    }
//
//                    $queryPlaceholder.= " $field[field_name] AS '$field[descript]',";
//                    $currentTable = $field['table_name'];
//                    break;
//            }