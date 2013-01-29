<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemMinorTicks extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartValueAxisItemMinorTicks
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the minor ticks.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\StockChartValueAxisItemMinorTicks
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
