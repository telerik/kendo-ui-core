<?php

namespace kendo\ui;

class GridFilterableOperatorsNumber extends \kendo\SerializableObject {
//>> Properties

    public function setEq($value) {
        $this->setProperty('eq', $value);

        return $this;
    }

    public function setNeq($value) {
        $this->setProperty('neq', $value);

        return $this;
    }

    public function setGte($value) {
        $this->setProperty('gte', $value);

        return $this;
    }

    public function setGt($value) {
        $this->setProperty('gt', $value);

        return $this;
    }

    public function setLte($value) {
        $this->setProperty('lte', $value);

        return $this;
    }

    public function setLt($value) {
        $this->setProperty('lt', $value);

        return $this;
    }

//<< Properties
}

?>
