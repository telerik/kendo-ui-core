<?php

class DataSourceResult {
    private $db;

    function __construct($dsn) {
        $this->db = new PDO($dsn);
    }

    private function total($select) {
        $tableName = $this->table($select);

        $statement = $this->db->prepare('SELECT COUNT(*) FROM '.$tableName);

        $statement->execute();

        return $statement->fetch(PDO::FETCH_NUM);
    }

    private function table($select) {
        preg_match('/from ([^ ]*)/i', $select, $matches);

        return $matches[1];
    }

    private function page($select, $skip, $take) {
        $select.= ' LIMIT :skip,:take';

        return $select;
    }

    public function read($select, $request = null) {
        $result = array();

        $result['total'] = $this->total($select);

        if ($request) {
            $select = $this->page($select, $request->skip, $request->take);
        }

        $statement = $this->db->prepare($select);

        if ($request) {
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
