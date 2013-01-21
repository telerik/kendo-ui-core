<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemTooltip extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function border(\Kendo\Dataviz\UI\ChartSeriesItemTooltipBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function font($value) {
        return $this->setProperty('font', $value);
    }

    public function format($value) {
        return $this->setProperty('format', $value);
    }

    public function padding($value) {
        return $this->setProperty('padding', $value);
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
