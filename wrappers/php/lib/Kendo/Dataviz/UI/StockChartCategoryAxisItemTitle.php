<?php

namespace Kendo\Dataviz\UI;

class StockChartCategoryAxisItemTitle extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function border(\Kendo\Dataviz\UI\StockChartCategoryAxisItemTitleBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function font($value) {
        return $this->setProperty('font', $value);
    }

    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    public function position($value) {
        return $this->setProperty('position', $value);
    }

    public function rotation($value) {
        return $this->setProperty('rotation', $value);
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
