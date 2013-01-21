<?php

namespace Kendo\UI;

class GridFilterableOperatorsNumber extends \Kendo\SerializableObject {
//>> Properties

    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

    public function gte($value) {
        return $this->setProperty('gte', $value);
    }

    public function gt($value) {
        return $this->setProperty('gt', $value);
    }

    public function lte($value) {
        return $this->setProperty('lte', $value);
    }

    public function lt($value) {
        return $this->setProperty('lt', $value);
    }

//<< Properties
}

?>
