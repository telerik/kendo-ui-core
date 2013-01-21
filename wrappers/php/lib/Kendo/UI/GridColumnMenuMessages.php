<?php

namespace Kendo\UI;

class GridColumnMenuMessages extends \Kendo\SerializableObject {
//>> Properties

    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    public function sortAscending($value) {
        return $this->setProperty('sortAscending', $value);
    }

    public function sortDescending($value) {
        return $this->setProperty('sortDescending', $value);
    }

//<< Properties
}

?>
