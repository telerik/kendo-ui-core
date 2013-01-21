<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function line(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine $value) {
        return $this->setProperty('line', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
