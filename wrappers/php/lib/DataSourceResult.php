<?php

class DataSourceResult {
    private $db;

    private $stringOperators = array(
        'eq' => 'LIKE',
        'neq' => 'NOT LIKE',
        'doesnotcontain' => 'NOT LIKE',
        'contains' => 'LIKE',
        'startswith' => 'LIKE',
        'endswith' => 'LIKE'
    );

    private $operators = array(
        'eq' => '=',
        'gt' => '>',
        'gte' => '>=',
        'lt' => '<',
        'lte' => '<=',
        'neq' => '!='
    );

    function __construct($dsn) {
        $this->db = new PDO($dsn);
    }

    private function total($tableName, $columns, $request) {
        if (isset($request->filter)) {
            $where = $this->filter($columns, $request->filter);
            $statement = $this->db->prepare("SELECT COUNT(*) FROM $tableName $where");
            $this->bindFilterValues($statement, $request->filter);
        } else {
            $statement = $this->db->prepare("SELECT COUNT(*) FROM $tableName");
        }

        $statement->execute();

        return $statement->fetch(PDO::FETCH_NUM);
    }

    private function page() {
        return ' LIMIT :skip,:take';
    }

    private function sort($columns, $sort) {
        $count = count($sort);

        $sql = '';

        if ($count > 0) {
            $sql = ' ORDER BY ';

            $order = array();

            for ($index = 0; $index < $count; $index ++) {
                $field = $sort[$index]->field;

                if (in_array($field, $columns)) {
                    $dir = 'ASC';

                    if ($sort[$index]->dir == 'desc') {
                        $dir = 'DESC';
                    }

                    $order[] = "$field $dir";
                }

            }

            $sql .= implode(',', $order);
        }

        return $sql;
    }

    private function where($columns, $filter, $all) {
        if (isset($filter->filters)) {
            $logic = ' AND ';

            if ($filter->logic == 'or') {
                $logic = ' OR ';
            }

            $filters = $filter->filters;

            $where = array();

            for ($index = 0; $index < count($filters); $index++) {
                $where[] = $this->where($columns, $filters[$index], $all);
            }

            $where = implode($logic, $where);

            return "($where)";
        }

        $field = $filter->field;

        if (in_array($field, $columns)) {
            $index = array_search($filter, $all);

            if ($this->isString($filter->value)) {
                $operator = $this->stringOperators[$filter->operator];
            } else {
                $operator = $this->operators[$filter->operator];
            }

            return "$field $operator :filter$index";
        }
    }

    private function flatten(&$all, $filter) {
        if (isset($filter->filters)) {
            $filters = $filter->filters;

            for ($index = 0; $index < count($filters); $index++) {
                $this->flatten($all, $filters[$index]);
            }
        } else {
            $all[] = $filter;
        }
    }

    private function filter($columns, $filter) {
        $all = array();

        $this->flatten($all, $filter);

        $where = $this->where($columns, $filter, $all);

        return " WHERE $where";
    }

    private function isString($value) {
        return !is_bool($value) && !is_numeric($value);
    }

    private function bindFilterValues($statement, $filter) {
        $filters = array();
        $this->flatten($filters, $filter);

        for ($index = 0; $index < count($filters); $index++) {
            $value = $filters[$index]->value;
            $operator = $filters[$index]->operator;

            if ($operator == 'contains' || $operator == 'doesnotcontain') {
                $value = "%$value%";
            } else if ($operator == 'startswith') {
                $value = "$value%";
            } else if ($operator == 'endswith') {
                $value = "%$value";
            }

            $statement->bindValue(":filter$index", $value);
        }
    }

    public function read($table, $columns, $request = null) {
        $result = array();

        $result['total'] = $this->total($table, $columns, $request);

        $sql = sprintf('SELECT %s FROM %s', implode(', ', $columns), $table);

        if (isset($request->filter)) {
            $sql .= $this->filter($columns, $request->filter);
        }

        if (isset($request->sort)) {
            $sql .= $this->sort($columns, $request->sort);
        }

        if (isset($request->skip) && isset($request->take)) {
            $sql .= $this->page();
        }

        $statement = $this->db->prepare($sql);

        if (isset($request->filter)) {
            $this->bindFilterValues($statement, $request->filter);
        }

        if (isset($request->skip) && isset($request->take)) {
            $statement->bindValue(':skip', (int)$request->skip);
            $statement->bindValue(':take', (int)$request->take);
        }

        $statement->execute();

        $data = $statement->fetchAll();

        $result['data'] = $data;

        return $result;
    }
}

?>
