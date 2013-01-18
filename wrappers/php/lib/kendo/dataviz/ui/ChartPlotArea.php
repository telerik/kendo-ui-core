<?php

namespace kendo\dataviz\ui;

class ChartPlotArea extends \kendo\SerializableObject {
//>> Properties

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function setBorder(\kendo\dataviz\ui\ChartPlotAreaBorder $value) {
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
