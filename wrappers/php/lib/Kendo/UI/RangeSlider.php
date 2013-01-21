<?php

namespace Kendo\UI;

class RangeSlider extends \Kendo\UI\Widget {
    public function name() {
        return 'RangeSlider';
    }
//>> Properties

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

    public function selectionEnd($value) {
        return $this->setProperty('selectionEnd', $value);
    }

    public function selectionStart($value) {
        return $this->setProperty('selectionStart', $value);
    }

    public function smallStep($value) {
        return $this->setProperty('smallStep', $value);
    }

    public function tickPlacement($value) {
        return $this->setProperty('tickPlacement', $value);
    }

    public function tooltip(\Kendo\UI\RangeSliderTooltip $value) {
        return $this->setProperty('tooltip', $value);
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
