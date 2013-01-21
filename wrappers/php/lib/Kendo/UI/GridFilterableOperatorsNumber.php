<?php

namespace Kendo\UI;

class GridFilterableOperatorsNumber extends \Kendo\SerializableObject {
//>> Properties

    public function setEQ($value) {
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

    public function setGT($value) {
        $this->setProperty('gt', $value);

        return $this;
    }

    public function setLte($value) {
        $this->setProperty('lte', $value);

        return $this;
    }

    public function setLT($value) {
        $this->setProperty('lt', $value);

        return $this;
    }

//<< Properties
}

?>
