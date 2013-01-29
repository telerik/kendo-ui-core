<?php

namespace Kendo\UI;

class GridSortable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines whether column can have unsorted state.
    * @param boolean $value
    * @return \Kendo\UI\GridSortable
    */
    public function allowUnsort($value) {
        return $this->setProperty('allowUnsort', $value);
    }

    /**
    * Defines sorting mode. Possible values:
    * @param string $value
    * @return \Kendo\UI\GridSortable
    */
    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

//<< Properties
}

?>
