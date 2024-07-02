<?php

// returns pre-defined json data, must be set to false in production. //
const DEBUG = false;

// bypasses security for api testing. !! SECURITY RISK. MUST BE SET TO false IN PRODUCTION !! //
const APITEST = false;

// sets allowed origin of request in production, must be set to true in production //
const PRODUCTION = false;

// defines path where files will be saved //
define("FILE_ROOT", PRODUCTION
    ? "\\Sites\AdU_Uploads\\"
    : 'C:/wamp/documents/');
define("FILE_PATH", FILE_ROOT . "201_file");

// defines max file size allowed //
const MAX_FILE_SIZE = 25000000;

// defines allowed origin //
define("ROOT", PRODUCTION
    ? 'https://live.adamson.edu.ph'
    : ' http://127.0.0.1:1234');
//--- env values used in dev environment ---//
// defines temporary tables to be truncated by the cli before production //
define("TEMP_TABLES", serialize(array(
    "db201_file.applications",
    "db201_file.application_fields",
    "db201_file.application_attachments",
    "db201_file.messages",
)));

// defines session data used when APITEST constant is set to true //
define("DUMMY_SESSION", serialize((object) array(
    "emp_no" => '2022070096',
    'access_type' => 'hr',
)));