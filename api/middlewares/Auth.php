<?php
class Auth
{
    public function __construct()
    {
        if(!isset($_SESSION)){
            session_start();
        }
        if(!isset($_SESSION['AdUOLLMSidno'])){
            session_destroy();
            response(array("message" => "Session expired"), 401);
        }
    }
}