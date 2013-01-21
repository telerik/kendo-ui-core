<?php

namespace Kendo\Data;

class DataSourceTransportRead extends \kendo\SerializableObject {
//>> Properties

    public function cache($value) {
        return $this->setProperty('cache', $value);
    }

    public function contentType($value) {
        return $this->setProperty('contentType', $value);
    }

    public function data($value) {
        return $this->setProperty('data', $value);
    }

    public function dataType($value) {
        return $this->setProperty('dataType', $value);
    }

    public function type($value) {
        return $this->setProperty('type', $value);
    }

    public function url($value) {
        return $this->setProperty('url', $value);
    }

//<< Properties
}

?>
