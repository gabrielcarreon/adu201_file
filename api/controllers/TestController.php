<?php
namespace Api\Controllers;

require_once 'BaseController.php';

class TestController extends BaseController
{
    /**
     * @throws \Exception
     */
    public static function test()
    {
        response(array("message" => "TEST"), 200);
    }
}