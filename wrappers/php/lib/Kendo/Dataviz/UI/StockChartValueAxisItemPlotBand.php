<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemPlotBand extends \Kendo\SerializableObject {
//>> Properties

    public function from($value) {
        $this->setProperty('from', $value);

        return $this;
    }

    public function to($value) {
        $this->setProperty('to', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

//<< Properties
}

?>
