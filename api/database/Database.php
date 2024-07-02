<?php

namespace Api\Database;

class Database
{
    private static $db = null;
    private static $uniqueToken = "#19;39";
    private static $connection;

    /*
    $query = sql query (user inputs must be replaced with placeholder (?).);
    $params = parameters to replace placeholders
    * already safe from sql injection
    */

    // TODO AAYUSIN PA DIN TO
    public static function execute($query, $params, $db, $return = true)
    {
        Database::getDatabaseConnection($db);
        if (Database::checkBindParamError($query, Database::$uniqueToken, $params)) {
            return array("error" => "parameters-mismatch");
        }
        $stmt = Database::prepareStatement($query, $params);
        if($return){
            if (Database::$connection == "MYSQL") {
                return $result = $stmt->get_result();
            } elseif (Database::$connection == "MSSQL") {
                return $result = $stmt->execute();
            }
            return array("error" => "database-connection-error");
        }
        return true;
    }

    public static function lastInsertId($db){
        require 'D:\Sites\dbcon\dbconi.php';
        return mysqli_insert_id($dbc);
    }
    public static function select($query, $params, $db, $debug = false)
    {
        $response = array();
        Database::getDatabaseConnection($db);
        if (Database::checkBindParamError($query, Database::$uniqueToken, $params)) {
            return array("response" => 400, "error" => "parameters-mismatch");
        }
        if ($debug){
            $obj = new \stdClass();
            $obj->query = $query;
            $obj->params = $params;
            debug($obj);
        }

        $stmt = Database::prepareStatement($query, $params);


        if (Database::$connection == "MYSQL") {
            $result = $stmt[0]->get_result();
            while ($rows = $result->fetch_assoc()) {
                // $response[] = $rows;
                $response[] = array_map("do_nothing", $rows);
            }
        } elseif (Database::$connection == "MSSQL") {

            $result = $stmt->execute();
            while (!$result->EOF) {
                $fieldCount = $result->Fields->Count;
                $count = 0;
                $row = array();
                while ($count < $fieldCount) {
                    $fieldName = $result->Fields($count)->Name;
                    $fieldValue = strval($result->Fields($count)->Value);
                    $row[$fieldName] = $fieldValue;
                    $count++;
                }
                // $response[] = $row;
                $response[] = array_map("do_nothing", $row);
                $result->MoveNext();
            }
        };
        return $response;
    }
    public static function execSP($query, $params, $db, $debug = false, $return = false)
    {
        $response = array();
        Database::getDatabaseConnection($db);
        if (Database::checkBindParamError($query, Database::$uniqueToken, $params)) {
            return array("response" => 400, "error" => "parameters-mismatch");
        }
        if ($debug){
            $obj = new \stdClass();
            $obj->query = $query;
            $obj->params = $params;
            $obj->db = $db;
            debug($obj);
        }
        $stmt = Database::prepareStatement($query, $params);
        if (!$return) return;
        if (Database::$connection == "MYSQL") {
            $result = $stmt[0]->get_result();
            while ($rows = $result->fetch_assoc()) {
                // $response[] = $rows;
                $response[] = array_map("do_nothing", $rows);
            }
        } elseif (Database::$connection == "MSSQL") {

            $result = $stmt->execute();
            while (!$result->EOF) {
                $fieldCount = $result->Fields->Count;
                $count = 0;
                $row = array();
                while ($count < $fieldCount) {
                    $fieldName = $result->Fields($count)->Name;
                    $fieldValue = strval($result->Fields($count)->Value);
                    $row[$fieldName] = $fieldValue;
                    $count++;
                }
                $response[] = array_map("do_nothing", $row);
                $result->MoveNext();
            }
        };
        return $response;
    }
    public static function selectArrayResponse($query, $params, $db)
    {
        $response = array();
        Database::getDatabaseConnection($db);
        if (Database::checkBindParamError($query, Database::$uniqueToken, $params)) {
            return array("response" => 400, "error" => "parameters-mismatch");
        }
        $stmt = Database::prepareStatement($query, $params);
        if (Database::$connection == "MYSQL") {
            $result = $stmt->get_result();
            while ($rows = $result[0]->fetch_assoc()) {
                $response[] = array_map("do_nothing", $rows);
            }
        } elseif (Database::$connection == "MSSQL") {
            $result = $stmt->execute();
            while (!$result->EOF) {
                $fieldCount = $result->Fields->Count;
                $count = 0;
                $row = array();
                while ($count < $fieldCount) {
                    $fieldName = $result->Fields($count)->Name;
                    $fieldValue = strval($result->Fields($count)->Value);
                    $row[$fieldName] = $fieldValue;
                    $count++;
                }
                $response[] = array_map("do_nothing", $row);
                $result->MoveNext();
            }
        };
        return $response;
    }
    /**
     * Inserts data into a specified table in the database.
     *
     * @param array $params An array of datasets containing key-value pairs to be inserted.
     * @param string $table The name of the table to insert data into.
     * @param string $db The name of the database to connect to.
     * @param bool $debug If true, the query will be printed to the console.
     * @return bool|array|object Returns true if the data was successfully inserted, or an array with a response code and error message if there was an error.
     */
    public static function insert($params, $table, $db, $debug)
    {
        Database::getDatabaseConnection($db);
        $query = "INSERT INTO $table (";
        $keyArray = array();
        $valuesArray = array();
        foreach ($params as $datasets) {
            foreach ($datasets as $key => $values) {
                if (!in_array($key, $keyArray)) {
                    $keyArray[] = $key;
                    $query .= "$key, ";
                }
                $valuesArray[] = $values;
            }
        }
        $query = rtrim($query, ', ') . ") VALUES ";
        $initCount = 0;
        $keyCount = count($keyArray);
        $isMultiInsert = (count($valuesArray) / count($keyArray)) > 1 ? true : false;
        foreach ($valuesArray as $value) {
            if ($initCount == 0) {
                $query .= "(";
            } elseif ($keyCount == $initCount) {
                $query = rtrim($query, ', ') . "), (";
                $initCount = 0;
            }
            $query .= "?, ";
            $initCount++;
        }
        $query = rtrim($query, ', ') . ")";
        if ($debug){
            $obj = new \stdClass();
            $obj->query = $query;
            $obj->params = $params;
            $obj->db = $db;
            debug($obj);
        }
        if (Database::checkBindParamError($query, Database::$uniqueToken, $valuesArray)) {
            return array("error" => "parameters-mismatch");
        }
        $stmt = Database::prepareStatement($query, $params);
        return (object) array(
            "status" => $stmt[1],
            "properties" => $stmt[0],
        );
    }
    public static function updateDelete($params, $db, $table, $condition, $conditionParam, $debug)
    {
        /* build query */
        $query = "UPDATE $table SET";

        $keyArray = array();
        $valuesArray = array();
        foreach ($params[0] as $key => $values) {
            $query .= " $key = ?,";
            $valuesArray[] = $values;
        }
        $query = rtrim($query, ', ');
        $valuesArray = array_merge($valuesArray, $conditionParam);
        $query =  $query .= " " . $condition;
        if ($debug) {
            $obj = new \stdClass();
            $obj->query = $query;
            $obj->params = $valuesArray;
            $obj->db = $db;
            debug($obj);
        }
        Database::getDatabaseConnection($db);
        if (Database::checkBindParamError($query, Database::$uniqueToken, $valuesArray)) {
            return array("response" => 400, "error" => "parameters-mismatch");
        }
        $rst = Database::prepareStatement($query, $valuesArray);
        return (object) array(
            "status" => $rst[1],
            "properties" => $rst[0]
        );
        // return Database::$db->affected_rows;
    }

    public static function getDatabaseConnection($db)
    {
        switch (strtolower($db)) {
            case 'mysql':
                require 'D:\Sites\dbcon\dbconi.php';
                Database::$connection = "MYSQL";
                Database::$db = $dbc;
                Database::$db->autocommit(FALSE);
                break;
            case 102:
            case 108:
            case 116:
                include("D:\Sites\dbcon\dbconX$db.php");
                Database::$connection = "MSSQL";
                Database::$db = $conn;
                break;
        }
    }

    public static function prepareStatement($query, $oldparams)
    {
        $bindParamArray = array();
        $bindParams = array();
        $params = array();

        foreach ($oldparams as $value) {
            if (gettype($value) == 'array') {
                foreach ($value as $val) {
                    $params[] = $val;
                }
            } else {
                $params[] = $value;
            }
        }

        if (Database::$connection == "MYSQL") {
            $stmt = null;

            try {
                // Start transaction
                Database::$db->autocommit(false);

                // Prepare query
                $stmt = Database::$db->prepare($query);
                foreach ($params as $value) {
                    $bindParamArray[] = $value;
                }

                // Check if prepared statement was successfully created
                if (!$stmt) {
                    throw new \Exception("Failed to prepare the SQL statement");
                }

                if (count($params) != 0) {
                    // Create a bind type string to pass
                    $bindTypes = '';
                    foreach ($bindParamArray as $value) {
                        if (is_int($value)) {
                            $bindTypes .= 'i';
                        } elseif (is_float($value)) {
                            $bindTypes .= 'd';
                        } elseif (is_string($value)) {
                            $bindTypes .= 's';
                        } else {
                            $bindTypes .= 'b'; // Assume blob if data type is unknown
                        }
                    }

                    $bindParams[] = &$bindTypes;
                    foreach ($bindParamArray as $key => $value) {
//                        $bindParams[] = & $value;
                        $bindParams[] = & $bindParamArray[$key];
                    }

                    // Use call_user_func_array to invoke bind_param
                    call_user_func_array(array($stmt, 'bind_param'), $bindParams);
                }
                $stmt->execute();

                // Commit transaction
                Database::$db->commit();
                return array($stmt, true);
            } catch (\Exception $e) {
                // Rollback transaction on exception
                if ($stmt !== null) {
                    Database::$db->rollback();
                }
                Database::$db->autocommit(true);
                return false;
            }
        } elseif (Database::$connection == "MSSQL") {
            $cmd = new \COM("ADODB.Command");
            $cmd->ActiveConnection = Database::$db;
            $cmd->CommandText = $query;
            $count = 1;
            foreach ($params as $value) {
                // dynamically iset yung data type code at size na gagamitin sa arg ng CreateParameter;
                // refer nalang sa https://learn.microsoft.com/en-us/sql/ado/reference/ado-api/datatypeenum?view=sql-server-ver16 for more info.
                switch (gettype($value)) {
                    case 'integer':
                    case 'double';
                        $size = 15;
                        $dataTypeCode = 139;
                        break;
                    case 'NULL';
                        $size = 0;
                        $dataTypeCode = 202;
                        break;
                    case 'string':
                    default:
                        $size = 255;
                        $dataTypeCode = 200;
                        break;
                }
                $bindParam = $value;
                $cmd->Parameters->Append($cmd->CreateParameter("param" . $count, $dataTypeCode, 1, $size, $bindParam)); // CreateParameter args (name, datatypecode, output/input, size(255), value);
                $count++;
            }
            return $cmd;
        }
    }

    public static function checkBindParamError($query, $token, $params)
    {
        //to accommodate for IN conditions
        $paramsCount = 0;
        foreach ($params as $param) {
            if (gettype($param) == "array") {
                foreach ($param as $array) {
                    $paramsCount++;
                }
            } else {
                $paramsCount++;
            }
        }

        // Replace placehodler with unique token
        $modifiedQuery = preg_replace('/\?/', $token, $query);
        $placeholder = substr_count($modifiedQuery, $token);
        // Check if number of parameters match the placeholders
        if ($placeholder != $paramsCount) {
            return true;
        }
        return false;
    }
    public function __destruct()
    {
        Database::$connection == 'MYSQL' ?  Database::$db->close() : Database::$db = null;
    }
}
