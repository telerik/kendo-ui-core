<?php

namespace Kendo\Dataviz\UI;

class ChartLegend extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\ChartLegendBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\ChartLegendLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function margin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function offsetX($value) {
        $this->setProperty('offsetX', $value);

        return $this;
    }

    public function offsetY($value) {
        $this->setProperty('offsetY', $value);

        return $this;
    }

    public function padding($value) {
        $this->setProperty('padding', $value);

        return $this;
    }

    public function position($value) {
        $this->setProperty('position', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
