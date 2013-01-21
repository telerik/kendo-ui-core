<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function line(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

//<< Properties
}

?>
