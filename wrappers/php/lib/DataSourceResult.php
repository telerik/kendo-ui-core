<?php

class DataSourceResult {
    private $db;

    function __construct($dsn) {
        $this->db = new PDO($dsn);
    }

    public function read($select) {
        $result = array();

        $data = $this->db->query($select)->fetchAll();

        $result['total'] = count($data);
        $result['data'] = $data;

        return $result;
    }
}

?>
