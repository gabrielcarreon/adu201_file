<?php
const CLIROOT = __DIR__;
$files = glob("cli/src/functions/*.php");
foreach ($files as $file) {
    require_once $file;
}

// Check if script is running in CLI mode
if (php_sapi_name() !== 'cli') {
    exit("This script can only be run from the command line.");
}
// Parse command line options
$option = getopt("ha", array(
    "help", // no args
    "model:",   /* args
                * model: model name
                * table: table name
                */
    "table:",
    "controller:", // controller name
    "truncate", // no arg
    "middleware:", // name of the middleware
    "runSeeder:" // name of the seeder
));

if (isset($option['h']) || isset($option['help'])) {
    displayHelp();
    exit(0);
}
if (isset($option['a'])) {
    testAdu();
    exit(0);
}
if (isset($option['model']) && isset($option['table'])) {
    makeModel($option['model'], $option['table']);
    exit(0);
}
if (isset($option['controller'])) {
    makeController($option['controller']);
    exit(0);
}
if(isset($option['truncate'])){
    truncate();
    exit(0);
}
if(isset($option['middleware'])){
    makeMiddleware($option['middleware']);
    exit(0);
}
if(isset($option['runSeeder'])){
    runSeeder($option['runSeeder']);
    exit(0);
}
echo "Nothing to do.\n";