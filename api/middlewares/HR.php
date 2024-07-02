<?php
use Api\Providers\Auth;
class HR
{
    public function __construct()
    {
        $auth = new Auth();
        if($auth->getAccessType() != 'hr'){
            response(array("errors" => array("Unauthorized")), 401);
        }
        //place middleware code here
        //if unauthorized, use response function
    }
}