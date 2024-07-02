<?php
function makeMiddleware($name)
{
$content = '<?php
class '.$name.'
{
    public function __construct()
    {
        //place middleware code here
        //if unauthorized, use response function
    }
}';

    if(!is_dir(CLIROOT."/api/middlewares")){
        mkdir(CLIROOT."/api/middlewares", 0777, true);
    }
    if(file_exists(CLIROOT."/api/middlewares/".$name.".php")){
        echo $name." file already exists.";
        exit(0);
    }
    $result = file_put_contents(CLIROOT."/api/middlewares/".$name.".php", $content);

    if($result !== false){
        echo "--- Success : $name file was created. ---\n";
    }else{
        echo "--- Error: unable to create ".$name." ---\n";
    }
    exit(0);
}

