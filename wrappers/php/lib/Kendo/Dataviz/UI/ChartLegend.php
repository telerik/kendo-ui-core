<?php

namespace Kendo\Dataviz\UI;

class ChartLegend extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function border(\Kendo\Dataviz\UI\ChartLegendBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function labels(\Kendo\Dataviz\UI\ChartLegendLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    public function offsetX($value) {
        return $this->setProperty('offsetX', $value);
    }

    public function offsetY($value) {
        return $this->setProperty('offsetY', $value);
    }

    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    public function position($value) {
        return $this->setProperty('position', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
