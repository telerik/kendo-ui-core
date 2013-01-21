<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemTitle extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\ChartValueAxisItemTitleBorder $value) {
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

    public function rotation($value) {
        $this->setProperty('rotation', $value);

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
