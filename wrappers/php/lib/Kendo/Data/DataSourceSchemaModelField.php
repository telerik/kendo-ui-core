<?php

namespace Kendo\Data;

class DataSourceSchemaModelField extends \Kendo\SerializableObject {
    function __construct($field) {
        $this->field($field);
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function from($value) {
        return $this->setProperty('from', $value);
    }

    public function type($value) {
        return $this->setProperty('type', $value);
    }

    public function validation($value) {
        return $this->setProperty('validation', $value);
    }

    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    public function nullable($value) {
        return $this->setProperty('nullable', $value);
    }

    public function defaultValue($value) {
        return $this->setProperty('defaultValue', $value);
    }

    public function parse($value) {
        return $this->setProperty('parse', $value);
    }
}

?>
