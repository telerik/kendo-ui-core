<?php

namespace Kendo\Dataviz\UI;

class StockChartPlotArea extends \Kendo\SerializableObject {
//>> Properties

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function setBorder(\Kendo\Dataviz\UI\StockChartPlotAreaBorder $value) {
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
