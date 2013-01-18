<?php

namespace kendo\ui;

class GridSortable extends \kendo\SerializableObject {
//>> Properties

    public function setAllowUnsort($value) {
        $this->setProperty('allowUnsort', $value);

        return $this;
    }

    public function setMode($value) {
        $this->setProperty('mode', $value);

        return $this;
    }

//<< Properties
}

?>
