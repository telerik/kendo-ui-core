<?php

namespace Kendo\Data;

class DataSourceSchema extends \kendo\SerializableObject {
//>> Properties

    public function aggregates($value) {
        return $this->setProperty('aggregates', $value);
    }

    public function data($value) {
        return $this->setProperty('data', $value);
    }

    public function errors($value) {
        return $this->setProperty('errors', $value);
    }

    public function groups($value) {
        return $this->setProperty('groups', $value);
    }

    public function model($value) {
        return $this->setProperty('model', $value);
    }

    public function parse($value) {
        return $this->setProperty('parse', new \Kendo\JavaScriptFunction($value));
    }

    public function total($value) {
        return $this->setProperty('total', $value);
    }

    public function type($value) {
        return $this->setProperty('type', $value);
    }

//<< Properties
}

?>
