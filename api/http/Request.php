<?php

namespace Api\Http;

class Request
{
    protected $query;
    protected $request;
    protected $server;
    protected $headers;
    protected $cookies;
    protected $files;
    protected $attributes;

    public function __construct()
    {
        $this->query = $_GET;
        $this->request = $_POST;
        $this->server = $_SERVER;
        $this->headers = getallheaders();
        $this->cookies = $_COOKIE;
        $this->files = $_FILES;
        $this->attributes = array();
    }

    // Retrieve a value from the query string
    public function query($key = null)
    {
        if($key == null){
            return $this->query;
        }
        if(isset($this->query[$key])){
            return $this->query[$key];
        }
        return null;
    }

    // Retrieve a value from the request payload
    public function input($key, $default = null)
    {
        if(isset($this->request[$key])){
            return $this->request[$key];
        }
        return null;
    }

    // Retrieve all value frm the request payload
    public function all()
    {
        return $this->request;
    }

    // Retrieve a server variable
    public function server($key, $default = null)
    {
        return $this->server[$key] ? $default : $this->server[$key];
    }

    // Retrieve a header value
    public function header($key, $default = null)
    {
        $key = strtolower($key);
        return $this->headers[$key] ? $default : $this->headers[$key];
    }

    // Retrieve a cookie value
    public function cookie($key, $default = null)
    {
        return $this->cookies[$key] ? $default : $this->cookies[$key];
    }

    // Retrieve a file from the request
    public function file($key)
    {
        return $this->files[$key] ? null : $this->files[$key];
    }

    // Retrieve all files from the request
    public function files(){
        return $this->files;
    }

    // Retrieve a route parameter (placeholder method)
    public function route($key, $default = null)
    {
        return $this->attributes[$key] ? $default : $this->attributes[$key];
    }

    // Check if the request contains a file
    public function hasFile($key)
    {
        return isset($this->files[$key]) && $this->files[$key]['error'] == UPLOAD_ERR_OK;
    }

    // Get the full URL
    public function fullUrl()
    {
        $protocol = ($this->server('HTTPS') && $this->server('HTTPS') !== 'off' || $this->server('SERVER_PORT') == 443) ? "https://" : "http://";
        return $protocol . $this->server('HTTP_HOST') . $this->server('REQUEST_URI');
    }

    // Get the request path
    public function path()
    {
        return $this->server('REQUEST_URI');
    }
}
