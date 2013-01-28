<?php

namespace Kendo\Dataviz\UI;

class StockChartXAxisItemPlotBand extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The start position of the plot band in axis units.
    * @param float $value
    */
    public function from($value) {
        return $this->setProperty('from', $value);
    }

    /**
    * The end position of the plot band in axis units.
    * @param float $value
    */
    public function to($value) {
        return $this->setProperty('to', $value);
    }

    /**
    * The color of the plot band.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the plot band.
    * @param float $value
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
