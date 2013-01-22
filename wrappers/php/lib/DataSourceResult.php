<?php

class DataSourceResult {
    private $db;

    private $operators = array(
        'eq' => '='
    );

    function __construct($dsn) {
        $this->db = new PDO($dsn);
    }

    private function total($tableName) {
        $statement = $this->db->prepare("SELECT COUNT(*) FROM $tableName");

        $statement->execute();

        return $statement->fetch(PDO::FETCH_NUM);
    }

    private function page($sql, $skip, $take) {
        $sql .= ' LIMIT :skip,:take';


        return $sql;
    }

    private function sort($sql, $columns, $sort) {
        $count = count($sort);

        if ($count > 0) {
            $sql .= ' ORDER BY ';

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

    private function filter($sql, $columns, $filter) {
        $filters = $filter->filters;

        $count = count($filters);

        $where = array();

        for ($index = 0; $index < count($filters); $index++) {
            $field = $filters[$index]->field;

            if (in_array($field, $columns)) {
                $operator = $this->operators[$filters[$index]->operator];

                $where[] = "$field $operator :filter$index";
            }
        }

        if (count($where) > 0) {
            $logic = 'AND';

            if ($filter->logic == 'or') {
                $logic = 'OR';
            }

            $predicate = implode($logic, $where);

            $sql .= " WHERE $predicate ";
        }

        return $sql;
    }

    private function bindFilterValues($statement, $filter) {
        $filters = $filter->filters;

        for ($index = 0; $index < count($filters); $index++) {
            $value = $filters[$index]->value;

            $statement->bindValue(":filter$index", $value);
        }
    }

    public function read($table, $columns, $request = null) {
        $result = array();

        $result['total'] = $this->total($table);

        $sql = sprintf('SELECT %s FROM %s', implode(', ', $columns), $table);

        if (isset($request->filter)) {
            $sql = $this->filter($sql, $columns, $request->filter);
        }

        if (isset($request->sort)) {
            $sql = $this->sort($sql, $columns, $request->sort);
        }

        if (isset($request->skip) && isset($request->take)) {
            $sql = $this->page($sql, $request->skip, $request->take);
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
