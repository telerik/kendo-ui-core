<?php

namespace kendo\ui;

class GridFilterableMessages extends \kendo\SerializableObject {
//>> Properties

    public function setAnd($value) {
        $this->setProperty('and', $value);

        return $this;
    }

    public function setClear($value) {
        $this->setProperty('clear', $value);

        return $this;
    }

    public function setFilter($value) {
        $this->setProperty('filter', $value);

        return $this;
    }

    public function setInfo($value) {
        $this->setProperty('info', $value);

        return $this;
    }

    public function setIsFalse($value) {
        $this->setProperty('isFalse', $value);

        return $this;
    }

    public function setIsTrue($value) {
        $this->setProperty('isTrue', $value);

        return $this;
    }

    public function setOr($value) {
        $this->setProperty('or', $value);

        return $this;
    }

    public function setSelectValue($value) {
        $this->setProperty('selectValue', $value);

        return $this;
    }

//<< Properties
}

?>
