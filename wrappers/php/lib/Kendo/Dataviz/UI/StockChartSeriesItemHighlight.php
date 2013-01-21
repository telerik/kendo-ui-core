<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\StockChartSeriesItemHighlightBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function line(\Kendo\Dataviz\UI\StockChartSeriesItemHighlightLine $value) {
        return $this->setProperty('line', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
