<?php
function makeController($name)
{
    $name = ucwords(strtolower($name));
    $content = '<?php
    namespace Api\Controllers;
    require_once "BaseController.php";
    class '.$name.'Controller extends BaseController
    {
        /**
         * @throws \Exception
         */
        public static function index()
        {
            response(array("message" => "Hello Adamson"), 200);
        }
    }';

    if(!is_dir(CLIROOT."/api/controllers")){
        mkdir(CLIROOT."/api/controllers", 0777, true);
    }
    if(file_exists(CLIROOT."/api/controllers/".$name."Controller.php")){
        echo $name." file already exists.";
        exit(0);
    }
    $result = file_put_contents(CLIROOT."/api/controllers/".$name.".php", $content);

    if($result !== false){
        echo "--- Success: $name controller file was created. ---\n";
    }else{
        echo "--- Error: unable to create $name file. ---\n";
    }
    exit(0);
}
