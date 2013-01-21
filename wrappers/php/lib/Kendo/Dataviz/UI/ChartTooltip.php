<?php

namespace Kendo\Dataviz\UI;

class ChartTooltip extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\ChartTooltipBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function font($value) {
        $this->setProperty('font', $value);

        return $this;
    }

    public function format($value) {
        $this->setProperty('format', $value);

        return $this;
    }

    public function padding($value) {
        $this->setProperty('padding', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
