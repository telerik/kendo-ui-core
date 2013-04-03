<?php

namespace Kendo\UI;

class GridSortable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the user can get the grid in unsorted state by clicking the sorted column header.
    * @param boolean $value
    * @return \Kendo\UI\GridSortable
    */
    public function allowUnsort($value) {
        return $this->setProperty('allowUnsort', $value);
    }

    /**
    * The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by one column.
    * @param string $value
    * @return \Kendo\UI\GridSortable
    */
    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

//<< Properties
}

?>
