<?php
require_once 'php/functions/common.php';
require_once 'utilities/validation.php';
require_once 'env.php';
require_once 'routes/Route.php';
require_once 'providers/HTTPRequestProvider.php';

use Api\Routes\Route;

header("Access-Control-Allow-Origin:" . ROOT);
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + (60 * 60))); // 1 hour

try{
    $httpRequest = HTTPRequestProvider::api();
    Route::index($httpRequest->api, $httpRequest->method);
}catch (Exception $e) {
    response(array("errors" => array("Something went wrong")), 500);
}