<?php

namespace Api\Providers;

use Api\Database\DB;
use DateTime;
use Exception;

class Utilities
{
    private static $errors = array();
    private static $customMessage;

    private static function addError($defaultMessage){
        self::$errors[] = (isset(self::$customMessage) && self::$customMessage != '') ? self::$customMessage : $defaultMessage;
    }


    /**
     * @param $fieldName string
     * @param $data string | int | float
     * @param $rules string
     * @param $customMessage array
     * @return void
     * @throws Exception
     */
    public static function validate($fieldName, $data, $rules, $customMessage)
    {
        if(count($rules) === 0){
            throw new Exception("Invalid validation rules");
        }
        $rulesExploded = explode("|", $rules);
        foreach ($rulesExploded as $rule){
            @list($rule, $param) = explode(":", $rule);
            $trimRule = trim($rule);
            $param = trim($param);
            self::$customMessage = isset($customMessage[$trimRule]) ? $customMessage[$trimRule] : '';
            switch ($trimRule){
                case 'required':
                    if(!$data) self::addError("$fieldName is required");
                    break;
                case 'string':
                    if(gettype($data) != 'string') self::addError("$fieldName must be a string");
                    break;
                case 'int':
                    if(!preg_match('/^\d+$/', $data) || $data > 2147483647) self::addError("$fieldName must be an integer");
                    break;
                case 'float':
                case 'double':
                    if(!preg_match('/^\d+$/', $data) || $data > 340282300000000000000000000000000000000) self::addError("$fieldName must be a ".$trimRule);
                    break;
                case 'min_len':
                    if(strlen($data) < $param) self::addError("$fieldName cannot be less than $param");
                    break;
                case 'max_len':
                    if(strlen($data) > $param) self::addError("$fieldName cannot be greater than $param");
                    break;
                case 'field_exists':
                    list($table, $field) = explode(",", $param);
                    $rst = DB::raw("SELECT COUNT(id) AS count FROM $table WHERE $field = ?", array($fieldName), 'mysql');
                    if($rst[0]['count'] == 0){
                        self::addError("$data does not exist in $table");
                    }
                    break;
                case 'exists':
                    list($table, $field) = explode(",", $param);
                    $rst = DB::raw("SELECT COUNT(id) AS count FROM $table WHERE $field = ?", array($data), 'mysql');
                    if($rst[0]['count'] == 0){
                        self::addError("$data does not exist in $table");
                    }
                    break;
                case 'date':
                    if( !DateTime::createFromFormat("d/m/Y", $data) &&
                        !DateTime::createFromFormat("m/d/Y", $data) &&
                        !DateTime::createFromFormat("d-m-Y", $data) &&
                        !DateTime::createFromFormat("m-d-Y", $data)
                    ){
                        self::addError($data . " is not a valid date format");
                    }
                    break;
                default:
                    self::addError("$rule is not a valid rule");
                    break;
            }
            self::$customMessage = '';
        }
        if(count(self::$errors) > 0){
            response(array("errors" => self::$errors), 400);
        }
    }
}