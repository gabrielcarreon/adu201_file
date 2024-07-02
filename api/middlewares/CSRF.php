<?php

use \Api\Http\Request;
use Api\Providers\Auth;
class CSRF
{
    public function __construct(Request $request)
    {
        $auth = new Auth();
        if(!$request->query('_csrf_token') || (!APITEST && ($auth->getCSRFToken() != $request->query('_csrf_token')))){
            response(array("errors" => array(PRODUCTION ? "Unauthorized." : "CSRF token missing.")), 401);
        }
    }
}