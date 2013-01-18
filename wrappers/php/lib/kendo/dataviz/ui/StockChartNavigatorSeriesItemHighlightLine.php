<?php

namespace kendo\dataviz\ui;

class StockChartNavigatorSeriesItemHighlightLine extends \kendo\SerializableObject {
//>> Properties

    public function setWidth($value) {
        $this->setProperty('width', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

//<< Properties
}

?>
