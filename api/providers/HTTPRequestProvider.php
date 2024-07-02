<?php

class HTTPRequestProvider
{
    public static function api()
    {
        $httpMethod = $_SERVER['REQUEST_METHOD'];
//        try{
//            if($httpMethod == 'GET' && !isset($_GET['api'])) response('Invalid api call', 400);
//            if($httpMethod == 'POST' && !isset($_POST['api'])) response('Invalid api call', 400);
//        }catch (Exception $e){
//            response(array("message" => "Invalid api call"), 400);
//        }
        $obj = new stdClass();
        $obj->method = $httpMethod;
        $obj->api = $_REQUEST['api'];
        return $obj;
    }
}