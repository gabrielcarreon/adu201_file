<?php
    namespace Api\Models;
    require_once "base.model.php";
    class Seen extends BaseModel
    {
        protected $table = "db201_file.seens";
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
    }