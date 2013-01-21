<?php

namespace Kendo\UI;

class GridSortable extends \Kendo\SerializableObject {
//>> Properties

    public function allowUnsort($value) {
        return $this->setProperty('allowUnsort', $value);
    }

    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

//<< Properties
}

?>
