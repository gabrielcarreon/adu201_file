<?php
namespace Api\Routes;

require_once 'routes.php';

class Route
{
    private static $routes = array();
    public function  __construct($routes)
    {
        self::$routes = $routes;
    }

    public static function index($route, $method)
    {
        try{
            //if route does not exist in the routes array then return error 405
            if (!isset(self::$routes[$route])) response(array("message" => "Method not allowed."), 405);
            $response = self::$routes[$route];

            //if request method does not match the route's method then return error 405
            if($response->method != $method) response(array("message" => "Method not allowed."), 405);

            foreach ($response->middleware as $middleware) {
                require_once './middlewares/' . $middleware . '.php';
                new $middleware();
            }
            $controller = $response->controller;
            $controller();
        }catch (Exception $e) {
            throw new Exception('Invalid api call');
        }
    }
}