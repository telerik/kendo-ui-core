<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    public function setBorder(\Kendo\Dataviz\UI\StockChartSeriesItemHighlightBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setLine(\Kendo\Dataviz\UI\StockChartSeriesItemHighlightLine $value) {
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
