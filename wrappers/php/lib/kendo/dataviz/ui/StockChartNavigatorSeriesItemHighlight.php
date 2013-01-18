<?php

namespace kendo\dataviz\ui;

class StockChartNavigatorSeriesItemHighlight extends \kendo\SerializableObject {
//>> Properties

    public function setBorder(\kendo\dataviz\ui\StockChartNavigatorSeriesItemHighlightBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setLine(\kendo\dataviz\ui\StockChartNavigatorSeriesItemHighlightLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

//<< Properties
}

?>
