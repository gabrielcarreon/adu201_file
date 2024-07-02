<?php
use Api\Http\Request;
class Admin
{
    public function __construct(Request $request)
    {
        if(!isset($_SESSION)){
            session_start();
        }

        if(!isset($_SESSION['AdUOLLMSidno'])){
            session_destroy();
            response(array("message" => "Unauthorized"), 401);
        }
        if($_POST['password'] != 'adu1932'){
            response(array("message" => "Method does not exist."), 403);
        }
    }
}