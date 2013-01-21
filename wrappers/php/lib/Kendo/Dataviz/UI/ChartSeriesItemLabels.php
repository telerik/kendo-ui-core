<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLabels extends \Kendo\SerializableObject {
//>> Properties

    public function align($value) {
        return $this->setProperty('align', $value);
    }

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function border(\Kendo\Dataviz\UI\ChartSeriesItemLabelsBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function distance($value) {
        return $this->setProperty('distance', $value);
    }

    public function font($value) {
        return $this->setProperty('font', $value);
    }

    public function format($value) {
        return $this->setProperty('format', $value);
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

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
