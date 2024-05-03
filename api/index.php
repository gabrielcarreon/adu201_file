<?php
require_once 'php/functions/common.php';
require_once 'env.php';
require_once 'routes/Route.php';
require_once 'providers/HTTPRequestProvider.php';

use Api\Routes\Route;

header("Access-Control-Allow-Origin:" . ROOT);
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
$httpRequest = HTTPRequestProvider::api();
try{
    Route::index($httpRequest->api, $httpRequest->method);
}catch (Exception $e) {
    response(array("message" => "Something went wrong"), 500);
}