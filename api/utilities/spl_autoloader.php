<?php

//load classes automatically when class is called via use namespace
spl_autoload_register(function ($class_name) {
    $exploded = explode('\\', $class_name);
    $folder = strtolower($exploded[1]);
    $class = $exploded[2];
    require_once "./$folder/$class.php";
});