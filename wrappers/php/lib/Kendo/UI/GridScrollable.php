<?php

namespace Kendo\UI;

class GridScrollable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the grid will always display a single page of data. Scrolling would just change the data which is currently displayed.
    * @param boolean $value
    * @return \Kendo\UI\GridScrollable
    */
    public function virtual($value) {
        return $this->setProperty('virtual', $value);
    }

//<< Properties
}

?>
