<?php

namespace kendo\ui;

class GridFilterableOperatorsString extends \kendo\SerializableObject {
//>> Properties

    public function setEq($value) {
        $this->setProperty('eq', $value);

        return $this;
    }

    public function setNeq($value) {
        $this->setProperty('neq', $value);

        return $this;
    }

    public function setStartswith($value) {
        $this->setProperty('startswith', $value);

        return $this;
    }

    public function setContains($value) {
        $this->setProperty('contains', $value);

        return $this;
    }

    public function setDoesnotcontain($value) {
        $this->setProperty('doesnotcontain', $value);

        return $this;
    }

    public function setEndswith($value) {
        $this->setProperty('endswith', $value);

        return $this;
    }

//<< Properties
}

?>
