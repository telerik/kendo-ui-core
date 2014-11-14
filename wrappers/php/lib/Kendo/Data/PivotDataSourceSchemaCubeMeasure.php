<?php

namespace Kendo\Data;

class PivotDataSourceSchemaCubeMeasure extends \Kendo\SerializableObject {
    function __construct($field) {
        $this->name($field);
    }

    public function caption($value) {
        return $this->setProperty('caption', $value);
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function format($value) {
        return $this->setProperty('format', $value);
    }

    public function aggregate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('aggregate', $value);
    }

    public function aggregateName($value) {
        return $this->setProperty('aggregate', $value);
    }

    public function result($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('result', $value);
    }
}

?>
