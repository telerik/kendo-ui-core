<?php

namespace Kendo\UI;

class PivotGridSortable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the user can get the pivotgrid in unsorted state by clicking the sorted dimension field.
    * @param boolean $value
    * @return \Kendo\UI\PivotGridSortable
    */
    public function allowUnsort($value) {
        return $this->setProperty('allowUnsort', $value);
    }

//<< Properties
}

?>
