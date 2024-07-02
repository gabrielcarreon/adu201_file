<?php
function makeModel($name, $table)
{
    $name = ucwords(strtolower($name));
    $table = strtolower($table);
    $content = '<?php
    namespace Api\Models;
    require_once "base.model.php";
    class '.$name.' extends BaseModel
    {
        protected $table = "'.$table.'";
        protected $dynamicFields = array();
        protected $database = "mysql";
        public function __set($property, $value)
        {
            $this->dynamicFields[$property] = $value;
        }
    
        public function __get($property)
        {
            if (array_key_exists($property, $this->dynamicFields)) {
                return $this->dynamicFields[$property];
            }
            return null;
        }
    }';

    if(!is_dir(CLIROOT."/api/models")){
        mkdir(CLIROOT."/api/models", 0777, true);
    }
    if(file_exists(CLIROOT."/api/models/".$name.".php")){
        echo $name." file already exists.";
        exit(0);
    }
    $result = file_put_contents(CLIROOT."/api/models/".$name.".php", $content);

    if($result !== false){
        echo "--- Success: $name file was created. ---\n";
    }else{
        echo "--- Error: unable to create $name. --- \n";
    }
    exit(0);
}