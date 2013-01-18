<?php

namespace kendo\dataviz\ui;

class ChartCategoryAxisItemPlotBand extends \kendo\SerializableObject {
//>> Properties

    public function setFrom($value) {
        $this->setProperty('from', $value);

        return $this;
    }

    public function setTo($value) {
        $this->setProperty('to', $value);

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
