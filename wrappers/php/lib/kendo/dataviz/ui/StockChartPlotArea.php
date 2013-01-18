<?php

namespace kendo\dataviz\ui;

class StockChartPlotArea extends \kendo\SerializableObject {
//>> Properties

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function setBorder(\kendo\dataviz\ui\StockChartPlotAreaBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setMargin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

//<< Properties
}

?>
