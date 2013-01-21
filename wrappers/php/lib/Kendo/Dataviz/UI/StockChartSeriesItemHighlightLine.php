<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemHighlightLine extends \Kendo\SerializableObject {
//>> Properties

    public function width($value) {
        return $this->setProperty('width', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
