<?php

namespace Kendo\UI;

class TreeListSortable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the user can get the treelist in unsorted state by clicking the sorted column header.
    * @param boolean $value
    * @return \Kendo\UI\TreeListSortable
    */
    public function allowUnsort($value) {
        return $this->setProperty('allowUnsort', $value);
    }

    /**
    * The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by one column.
    * @param string $value
    * @return \Kendo\UI\TreeListSortable
    */
    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

//<< Properties
}

?>
