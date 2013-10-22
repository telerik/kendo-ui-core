<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemMinorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the lines.Note that this has no effect if the visibility of the minor grid lines is not set to true.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMinorGridLines
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the minor grid lines.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMinorGridLines
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The visibility of the lines.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMinorGridLines
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the lines.Note that this settings has no effect if the visibility of the minor grid lines is not set to true.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMinorGridLines
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The step of the value axis minor grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMinorGridLines
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The skip of the value axis minor grid lines.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemMinorGridLines
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

//<< Properties
}

?>
