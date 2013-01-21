<?php

namespace Kendo\UI;

class GridFilterableMessages extends \Kendo\SerializableObject {
//>> Properties

    public function and($value) {
        $this->setProperty('and', $value);

        return $this;
    }

    public function clear($value) {
        $this->setProperty('clear', $value);

        return $this;
    }

    public function filter($value) {
        $this->setProperty('filter', $value);

        return $this;
    }

    public function info($value) {
        $this->setProperty('info', $value);

        return $this;
    }

    public function isFalse($value) {
        $this->setProperty('isFalse', $value);

        return $this;
    }

    public function isTrue($value) {
        $this->setProperty('isTrue', $value);

        return $this;
    }

    public function or($value) {
        $this->setProperty('or', $value);

        return $this;
    }

    public function selectValue($value) {
        $this->setProperty('selectValue', $value);

        return $this;
    }

//<< Properties
}

?>
