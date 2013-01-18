<?php

namespace kendo\ui;

class GridColumnMenuMessages extends \kendo\SerializableObject {
//>> Properties

    public function setColumns($value) {
        $this->setProperty('columns', $value);

        return $this;
    }

    public function setFilter($value) {
        $this->setProperty('filter', $value);

        return $this;
    }

    public function setSortAscending($value) {
        $this->setProperty('sortAscending', $value);

        return $this;
    }

    public function setSortDescending($value) {
        $this->setProperty('sortDescending', $value);

        return $this;
    }

//<< Properties
}

?>
