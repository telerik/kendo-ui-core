<?php

namespace Kendo\Dataviz\UI;

class StockChartTitle extends \Kendo\SerializableObject {
//>> Properties

    public function align($value) {
        return $this->setProperty('align', $value);
    }

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function border(\Kendo\Dataviz\UI\StockChartTitleBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function font($value) {
        return $this->setProperty('font', $value);
    }

    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    public function position($value) {
        return $this->setProperty('position', $value);
    }

    public function text($value) {
        return $this->setProperty('text', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
