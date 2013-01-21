<?php

namespace Kendo\Dataviz\UI;

class StockChartChartArea extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function border(\Kendo\Dataviz\UI\StockChartChartAreaBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function height($value) {
        return $this->setProperty('height', $value);
    }

    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
