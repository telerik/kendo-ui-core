<?php

namespace Kendo\Data;

class DataSourceTransportCreate extends \kendo\SerializableObject {
//>> Properties

    public function cache($value) {
        $this->setProperty('cache', $value);

        return $this;
    }

    public function contentType($value) {
        $this->setProperty('contentType', $value);

        return $this;
    }

    public function data($value) {
        $this->setProperty('data', $value);

        return $this;
    }

    public function dataType($value) {
        $this->setProperty('dataType', $value);

        return $this;
    }

    public function type($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function url($value) {
        $this->setProperty('url', $value);

        return $this;
    }

//<< Properties
}

?>
