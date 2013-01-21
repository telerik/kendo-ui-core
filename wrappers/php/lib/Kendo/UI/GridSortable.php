<?php

namespace Kendo\UI;

class GridSortable extends \Kendo\SerializableObject {
//>> Properties

    public function allowUnsort($value) {
        $this->setProperty('allowUnsort', $value);

        return $this;
    }

    public function mode($value) {
        $this->setProperty('mode', $value);

        return $this;
    }

//<< Properties
}

?>
