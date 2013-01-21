<?php

namespace Kendo\UI;

class GridSortable extends \Kendo\SerializableObject {
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
