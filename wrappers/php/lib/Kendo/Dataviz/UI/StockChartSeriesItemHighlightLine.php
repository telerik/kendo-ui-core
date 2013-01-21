<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemHighlightLine extends \Kendo\SerializableObject {
//>> Properties

    public function width($value) {
        $this->setProperty('width', $value);

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
