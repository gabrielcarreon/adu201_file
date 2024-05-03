<?php
namespace Api\Models;
require_once './database/Database.php';

use Api\Database\Database;

class BaseModel
{
    protected $table;
    protected $database;
    protected $dynamicFields;
    private $params = array();
    private $whereClause = '';
    private $orderClause = '';
    private $limitClause = '';
    public function __construct()
    {
        // $this->database = 'default';
    }
    public function debug()
    {
        return $this->dynamicFields;
    }
    public static function find($id)
    {
        $model = new static();
        $model->where('id', '=', $id);
        return $model->get();
    }
    public static function all()
    {
        $model = new static();
        return $model->get();
    }
    public function andWhere($column, $operator, $value)
    {
        $placeholder = "";
        if (is_array($value)) {
            $placeholder = "(";
            foreach ($value as $val) {
                $placeholder .= "?,";
            }
            $placeholder = rtrim($placeholder, ",") . ")";
        } else {
            $placeholder .= "?";
        }
        $this->whereClause = $this->whereClause .= " AND $column $operator $placeholder";
        $this->params[] = $value;
        return $this;
    }
    public function where($column, $operator, $value)
    {
        $placeholder = "";
        if (is_array($value)) {
            $placeholder = "(";
            foreach ($value as $val) {
                $placeholder .= "?,";
            }
            $placeholder = rtrim($placeholder, ",") . ")";
        } else {
            $placeholder .= "?";
        }
        $this->whereClause = $this->whereClause .= " WHERE $column $operator $placeholder";
        $this->params[] = $value;
        return $this;
    }
    public function order($column, $order)
    {
        $this->orderClause = "ORDER BY $column $order";
        return $this;
    }
    public function limit($limit)
    {
        $this->limitClause = "LIMIT ?";
        $this->params[] = $limit;
        return $this;
    }
    public function getCount($selectable = "*")
    {
        $query = "SELECT COUNT($selectable) AS cnt FROM {$this->table} {$this->whereClause} {$this->orderClause} {$this->limitClause}";
        return Database::select($query, $this->params, $this->database);
    }

    public function get($selectable = "*", $debug = false)
    {
        $query = "SELECT $selectable FROM {$this->table} {$this->whereClause} {$this->orderClause} {$this->limitClause}";
        return Database::select($query, $this->params, $this->database, $debug);
    }

    public function create($debug = false)
    {
        $insertArray = array($this->dynamicFields);
        return Database::insert($insertArray, $this->table, $this->database, $debug);
    }
    public function commit($debug = false)
    {
        return Database::updateDelete(array($this->dynamicFields), $this->database, $this->table, $this->whereClause, $this->params, $debug);
    }

    public function delete($debug = false)
    {
        $deleteQuery = "UPDATE $this->table SET deleted_at = NOW() $this->whereClause";
        if($this->whereClause  == '') return false;
        if($debug) return $deleteQuery;
        return Database::execute($deleteQuery, $this->params, $this->database, false);
    }
}
