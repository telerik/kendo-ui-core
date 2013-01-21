<?php

namespace Kendo\UI;

class GridFilterableMessages extends \Kendo\SerializableObject {
//>> Properties

    public function and($value) {
        return $this->setProperty('and', $value);
    }

    public function clear($value) {
        return $this->setProperty('clear', $value);
    }

    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    public function info($value) {
        return $this->setProperty('info', $value);
    }

    public function isFalse($value) {
        return $this->setProperty('isFalse', $value);
    }

    public function isTrue($value) {
        return $this->setProperty('isTrue', $value);
    }

    public function or($value) {
        return $this->setProperty('or', $value);
    }

    public function selectValue($value) {
        return $this->setProperty('selectValue', $value);
    }

//<< Properties
}

?>
