<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemPlotBand extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The start position of the plot band in axis units.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemPlotBand
    */
    public function from($value) {
        return $this->setProperty('from', $value);
    }

    /**
    * The end position of the plot band in axis units.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemPlotBand
    */
    public function to($value) {
        return $this->setProperty('to', $value);
    }

    /**
    * The color of the plot band.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemPlotBand
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the plot band.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemPlotBand
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
