<?php

namespace Kendo\UI;

class GridFilterableOperatorsString extends \Kendo\SerializableObject {
//>> Properties

    public function eq($value) {
        return $this->setProperty('eq', $value);
    }

    public function neq($value) {
        return $this->setProperty('neq', $value);
    }

    public function startswith($value) {
        return $this->setProperty('startswith', $value);
    }

    public function contains($value) {
        return $this->setProperty('contains', $value);
    }

    public function doesnotcontain($value) {
        return $this->setProperty('doesnotcontain', $value);
    }

    public function endswith($value) {
        return $this->setProperty('endswith', $value);
    }

//<< Properties
}

?>
