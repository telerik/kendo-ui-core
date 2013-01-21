<?php

namespace Kendo\UI;

class GridPageableMessages extends \Kendo\SerializableObject {
//>> Properties

    public function setDisplay($value) {
        $this->setProperty('display', $value);

        return $this;
    }

    public function setEmpty($value) {
        $this->setProperty('empty', $value);

        return $this;
    }

    public function setPage($value) {
        $this->setProperty('page', $value);

        return $this;
    }

    public function setOF($value) {
        $this->setProperty('of', $value);

        return $this;
    }

    public function setItemsPerPage($value) {
        $this->setProperty('itemsPerPage', $value);

        return $this;
    }

    public function setFirst($value) {
        $this->setProperty('first', $value);

        return $this;
    }

    public function setPrevious($value) {
        $this->setProperty('previous', $value);

        return $this;
    }

    public function setNext($value) {
        $this->setProperty('next', $value);

        return $this;
    }

    public function setLast($value) {
        $this->setProperty('last', $value);

        return $this;
    }

    public function setRefresh($value) {
        $this->setProperty('refresh', $value);

        return $this;
    }

//<< Properties
}

?>
