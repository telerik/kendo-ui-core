<?php

namespace Kendo\UI;

class Slider extends \Kendo\UI\Widget {
    public function name() {
        return 'Slider';
    }
//>> Properties

    public function setDecreaseButtonTitle($value) {
        $this->setProperty('decreaseButtonTitle', $value);

        return $this;
    }

    public function setIncreaseButtonTitle($value) {
        $this->setProperty('increaseButtonTitle', $value);

        return $this;
    }

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

    public function setShowButtons($value) {
        $this->setProperty('showButtons', $value);

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

    public function setTooltip(\Kendo\UI\SliderTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function setValue($value) {
        $this->setProperty('value', $value);

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
