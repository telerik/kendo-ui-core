<?php

namespace Kendo\UI;

class PivotConfiguratorSortable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the user can get the widget in unsorted state by clicking the sorted dimension field.
    * @param boolean $value
    * @return \Kendo\UI\PivotConfiguratorSortable
    */
    public function allowUnsort($value) {
        return $this->setProperty('allowUnsort', $value);
    }

//<< Properties
}

?>
