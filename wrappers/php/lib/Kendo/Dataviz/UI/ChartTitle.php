<?php

namespace Kendo\Dataviz\UI;

class ChartTitle extends \Kendo\SerializableObject {
//>> Properties

    public function align($value) {
        $this->setProperty('align', $value);

        return $this;
    }

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\ChartTitleBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function font($value) {
        $this->setProperty('font', $value);

        return $this;
    }

    public function margin($value) {
        $this->setProperty('margin', $value);

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

    public function text($value) {
        $this->setProperty('text', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
