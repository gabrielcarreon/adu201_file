<?php
require_once './controllers/UserController.php';

use Api\Controllers\TestController;
use Api\Controllers\UserController;
use Api\Routes\Route;

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
        'middleware' => array()
    )
);

return new Route($routes);

