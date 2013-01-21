<?php

namespace Kendo\UI;

class RangeSlider extends \Kendo\UI\Widget {
    public function name() {
        return 'RangeSlider';
    }
//>> Properties

    public function setLargeStep($value) {
        $this->setProperty('largeStep', $value);

        return $this;
    }

    public function setMax($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function setMin($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function setOrientation($value) {
        $this->setProperty('orientation', $value);

        return $this;
    }

    public function setSelectionEnd($value) {
        $this->setProperty('selectionEnd', $value);

        return $this;
    }

    public function setSelectionStart($value) {
        $this->setProperty('selectionStart', $value);

        return $this;
    }

    public function setSmallStep($value) {
        $this->setProperty('smallStep', $value);

        return $this;
    }

    public function setTickPlacement($value) {
        $this->setProperty('tickPlacement', $value);

        return $this;
    }

    public function setTooltip(\Kendo\UI\RangeSliderTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSlide($value) {
        $this->setProperty('slide', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
