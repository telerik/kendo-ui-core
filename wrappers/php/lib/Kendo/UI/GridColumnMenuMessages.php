<?php

namespace Kendo\UI;

class GridColumnMenuMessages extends \Kendo\SerializableObject {
//>> Properties

    public function columns($value) {
        $this->setProperty('columns', $value);

        return $this;
    }

    public function filter($value) {
        $this->setProperty('filter', $value);

        return $this;
    }

    public function sortAscending($value) {
        $this->setProperty('sortAscending', $value);

        return $this;
    }

    public function sortDescending($value) {
        $this->setProperty('sortDescending', $value);

        return $this;
    }

//<< Properties
}

?>
