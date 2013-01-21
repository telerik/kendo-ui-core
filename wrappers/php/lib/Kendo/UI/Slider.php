<?php

namespace Kendo\UI;

class Slider extends \Kendo\UI\Widget {
    public function name() {
        return 'Slider';
    }
//>> Properties

    public function decreaseButtonTitle($value) {
        return $this->setProperty('decreaseButtonTitle', $value);
    }

    public function increaseButtonTitle($value) {
        return $this->setProperty('increaseButtonTitle', $value);
    }

    public function largeStep($value) {
        return $this->setProperty('largeStep', $value);
    }

    public function max($value) {
        return $this->setProperty('max', $value);
    }

    public function min($value) {
        return $this->setProperty('min', $value);
    }

    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    public function showButtons($value) {
        return $this->setProperty('showButtons', $value);
    }

    public function smallStep($value) {
        return $this->setProperty('smallStep', $value);
    }

    public function tickPlacement($value) {
        return $this->setProperty('tickPlacement', $value);
    }

    public function tooltip(\Kendo\UI\SliderTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function slide($value) {
        return $this->setProperty('slide', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
