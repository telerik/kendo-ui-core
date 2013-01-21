<?php

namespace Kendo\Data;

class DataSourceSchema extends \kendo\SerializableObject {
//>> Properties

    public function aggregates($value) {
        $this->setProperty('aggregates', $value);

        return $this;
    }

    public function data($value) {
        $this->setProperty('data', $value);

        return $this;
    }

    public function errors($value) {
        $this->setProperty('errors', $value);

        return $this;
    }

    public function groups($value) {
        $this->setProperty('groups', $value);

        return $this;
    }

    public function model($value) {
        $this->setProperty('model', $value);

        return $this;
    }

    public function parse($value) {
        $this->setProperty('parse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function total($value) {
        $this->setProperty('total', $value);

        return $this;
    }

    public function type($value) {
        $this->setProperty('type', $value);

        return $this;
    }

//<< Properties
}

?>
