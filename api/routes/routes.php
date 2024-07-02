<?php
require_once './utilities/spl_autoloader.php';

use Api\Controllers\ApplicationController;
use Api\Controllers\AttachmentController;
use Api\Controllers\UserController;
use Api\Controllers\MessageController;
use Api\Routes\Route;
use Api\Http\Request;

$routes = array(
    'session' => (object) array(
        'controller' => function (){ UserController::user(); } ,
        'method' => 'GET',
        'middleware' => array('Auth', 'Employees')
    ),
    'session.create' => (object) array(
        'controller' => function (){ UserController::createSession(); } ,
        'method' => 'GET',
        'middleware' => array('Auth', 'Employees')
    ),
    'session.check' => (object) array(
        'controller' => function (){ UserController::checkAuth(); } ,
        'method' => 'GET',
        'middleware' => array('Auth', 'Employees')
    ),
    '201.info' => (object) array(
        'controller' => function (){ UserController::user201(); } ,
        'method' => 'GET',
        'middleware' => array('Auth', 'Employees'),
    ),
    '201.apply' => (object) array(
        'controller' => function () { ApplicationController::apply(new Request()); },
        'method' => 'POST',
        'middleware' => array('Auth', 'Employees')
    ),
    '201.applications' => (object) array(
        'controller' => function () { ApplicationController::applications(new Request()); },
        'method' => 'GET',
        'middleware' => array('Auth', 'Employees')
    ),
    '201.application_info' => (object) array(
        'controller' => function () { ApplicationController::applicationInfo(new Request()); },
        'method' => 'GET',
        'middleware' => array('Auth', 'Employees', 'CSRF'),
    ),
    '201.hr_submit_changes' => (object) array(
        'controller' => function () { ApplicationController::hrSubmitChanges(new Request()); },
        'method' => 'POST',
        'middleware' => array('Auth', 'Employees', 'CSRF', 'HR')
    ),
    'getFile' => (object) array(
        'controller' => function () { AttachmentController::index(new Request()); },
        'method' => 'POST',
        'middleware' => array('CSRF', 'Auth', 'Employees')
    ),
    'message/send' => (object) array(
        'controller' => function () { MessageController::sendMessage(new Request()); },
        'method' => 'POST',
        'middleware' => array('Auth', 'Employees', 'CSRF')
    ),
    'message/seen' => (object) array(
        'controller' => function () { MessageController::setSeen(new Request()); },
        'method' => 'POST',
        'middleware' => array('Auth', 'Employees', 'CSRF')
    ),
    'application/cancel' => (object) array(
        'controller' => function () { ApplicationController::cancelApplication(new Request()); },
        'method' => 'POST',
        'middleware' => array('Auth', 'Employees', 'CSRF')
    )
);

return new Route($routes);

