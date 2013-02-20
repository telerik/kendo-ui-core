<?php

namespace Kendo\Dataviz\UI;

class SparklineCategoryAxisItemMajorTicks extends \kendo\SerializableObject {
//>> Properties

    /**
    * The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the major ticks.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemMajorTicks
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
