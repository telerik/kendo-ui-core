<?php

namespace Kendo\UI;

class Slider extends \Kendo\UI\Widget {
    public function name() {
        return 'Slider';
    }
//>> Properties

    public function decreaseButtonTitle($value) {
        $this->setProperty('decreaseButtonTitle', $value);

        return $this;
    }

    public function increaseButtonTitle($value) {
        $this->setProperty('increaseButtonTitle', $value);

        return $this;
    }

    public function largeStep($value) {
        $this->setProperty('largeStep', $value);

        return $this;
    }

    public function max($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function min($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function orientation($value) {
        $this->setProperty('orientation', $value);

        return $this;
    }

    public function showButtons($value) {
        $this->setProperty('showButtons', $value);

        return $this;
    }

    public function smallStep($value) {
        $this->setProperty('smallStep', $value);

        return $this;
    }

    public function tickPlacement($value) {
        $this->setProperty('tickPlacement', $value);

        return $this;
    }

    public function tooltip(\Kendo\UI\SliderTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function value($value) {
        $this->setProperty('value', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function slide($value) {
        $this->setProperty('slide', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
