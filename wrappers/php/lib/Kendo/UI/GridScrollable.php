<?php

namespace Kendo\UI;

class GridScrollable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Enable/disable virtual scrolling. When enabled the grid will display only a single page of data (configured via dataSource.pageSize).
    * @param boolean $value
    * @return \Kendo\UI\GridScrollable
    */
    public function virtual($value) {
        return $this->setProperty('virtual', $value);
    }

//<< Properties
}

?>
