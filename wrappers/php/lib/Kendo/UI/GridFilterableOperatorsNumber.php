<?php

namespace Kendo\UI;

class GridFilterableOperatorsNumber extends \Kendo\SerializableObject {
//>> Properties

    public function eq($value) {
        $this->setProperty('eq', $value);

        return $this;
    }

    public function neq($value) {
        $this->setProperty('neq', $value);

        return $this;
    }

    public function gte($value) {
        $this->setProperty('gte', $value);

        return $this;
    }

    public function gt($value) {
        $this->setProperty('gt', $value);

        return $this;
    }

    public function lte($value) {
        $this->setProperty('lte', $value);

        return $this;
    }

    public function lt($value) {
        $this->setProperty('lt', $value);

        return $this;
    }

//<< Properties
}

?>
