<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemSelectMousewheel extends \kendo\SerializableObject {
//>> Properties

    /**
    * Reverses the mousewheel zoom direction.
Normal direction is down for "zoom out", up for "zoom in".
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemSelectMousewheel
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * The zoom direction. Possible values:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemSelectMousewheel
    */
    public function zoom($value) {
        return $this->setProperty('zoom', $value);
    }

//<< Properties
}

?>
