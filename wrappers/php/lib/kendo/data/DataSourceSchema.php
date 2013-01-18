<?php

namespace kendo\data;

class DataSourceSchema extends \kendo\SerializableObject {
//>> Properties

    public function setAggregates($value) {
        $this->setProperty('aggregates', $value);

        return $this;
    }

    public function setData($value) {
        $this->setProperty('data', $value);

        return $this;
    }

    public function setErrors($value) {
        $this->setProperty('errors', $value);

        return $this;
    }

    public function setGroups($value) {
        $this->setProperty('groups', $value);

        return $this;
    }

    public function setModel($value) {
        $this->setProperty('model', $value);

        return $this;
    }

    public function setParse($value) {
        $this->setProperty('parse', $value);

        return $this;
    }

    public function setTotal($value) {
        $this->setProperty('total', $value);

        return $this;
    }

    public function setType($value) {
        $this->setProperty('type', $value);

        return $this;
    }

//<< Properties
}

?>
