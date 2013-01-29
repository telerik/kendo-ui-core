<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItemMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartYAxisItemMajorTicks
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the major ticks.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\StockChartYAxisItemMajorTicks
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
