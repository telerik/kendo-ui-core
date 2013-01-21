<?php

namespace Kendo\UI;

class RangeSlider extends \Kendo\UI\Widget {
    public function name() {
        return 'RangeSlider';
    }
//>> Properties

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

    public function selectionEnd($value) {
        $this->setProperty('selectionEnd', $value);

        return $this;
    }

    public function selectionStart($value) {
        $this->setProperty('selectionStart', $value);

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

    public function tooltip(\Kendo\UI\RangeSliderTooltip $value) {
        $this->setProperty('tooltip', $value);

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
