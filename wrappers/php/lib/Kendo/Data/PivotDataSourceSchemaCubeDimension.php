<?php

namespace Kendo\Data;

class PivotDataSourceSchemaCubeDimension extends \Kendo\SerializableObject {
    function __construct($field) {
        $this->field($field);
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function caption($value) {
        return $this->setProperty('caption', $value);
    }
}

?>
