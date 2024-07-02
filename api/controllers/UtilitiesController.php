<?php

namespace Api\Controllers;
use Api\Database\DB;
class UtilitiesController extends BaseController
{
    public static function truncate()
    {
        DB::raw("DELETE FROM db201_file.applications", array(), 'mysql');
        DB::raw("DELETE FROM db201_file.application_fields", array(), 'mysql');
        DB::raw("DELETE FROM db201_file.application_attachments", array(), 'mysql');
        response(array("status" => "success"));
    }
}