<?php

namespace Kendo\Dataviz\UI;

class StockChartPlotArea extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function border(\Kendo\Dataviz\UI\StockChartPlotAreaBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

//<< Properties
}

?>
