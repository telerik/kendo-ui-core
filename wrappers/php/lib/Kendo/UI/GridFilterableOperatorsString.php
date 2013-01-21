<?php

namespace Kendo\UI;

class GridFilterableOperatorsString extends \Kendo\SerializableObject {
//>> Properties

    public function eq($value) {
        $this->setProperty('eq', $value);

        return $this;
    }

    public function neq($value) {
        $this->setProperty('neq', $value);

        return $this;
    }

    public function startswith($value) {
        $this->setProperty('startswith', $value);

        return $this;
    }

    public function contains($value) {
        $this->setProperty('contains', $value);

        return $this;
    }

    public function doesnotcontain($value) {
        $this->setProperty('doesnotcontain', $value);

        return $this;
    }

    public function endswith($value) {
        $this->setProperty('endswith', $value);

        return $this;
    }

//<< Properties
}

?>
