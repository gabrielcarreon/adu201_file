<?php
use Api\Http\Request;
class Auth
{
    public function __construct(Request $request)
    {
        if(!isset($_SESSION)){
            session_start();
        }

        if(!isset($_SESSION['AdUOLLMSidno'])){
            session_destroy();
            response(array("errors" => array("Session expired.")), 401);

        }

    }
}