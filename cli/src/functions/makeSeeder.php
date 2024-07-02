<?php
function makeSeeder($name)
{
    $name = ucwords(strtolower($name));
    $content = '<?php
require_once "D:\Sites\dbcon\dbconi.php";

$rows = 1000;
$init = 0;
while ($init < $rows){

   // place your query here
    echo "---Success: Inserted $init / $rows ---\n";
    $init++;
    
}

';

    if(!is_dir(CLIROOT."/cli/src/seeders")){
        mkdir(CLIROOT."/cli/src/seders", 0777, true);
    }
    if(file_exists(CLIROOT."/cli/src/seders/".$name.".php")){
        echo $name." file already exists.";
        exit(0);
    }
    $result = file_put_contents(CLIROOT."/cli/src/seders/".$name.".php", $content);

    if($result !== false){
        echo "--- Success: $name file was created. ---\n";
    }else{
        echo "--- Error: unable to create $name. --- \n";
    }
    exit(0);
}