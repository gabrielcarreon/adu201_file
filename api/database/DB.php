<?php
namespace Api\Database;

class DB
{
    public static function raw($query, $params, $db, $debug = false)
    {
        return Database::select($query, $params, $db, $debug);
    }
    public static function execSP($query, $params, $db)
    {
        return Database::execSP($query, $params, $db);
    }
}