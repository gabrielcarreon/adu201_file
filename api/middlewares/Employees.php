<?php

class Employees
{
    public function __construct()
    {
        if(!isset($_SESSION)) session_start();

        if($_SESSION['AdUOLLMSuserlvl'] != 2){
            response(array("message" => "Access forbidden"), 403);
        }
    }
}