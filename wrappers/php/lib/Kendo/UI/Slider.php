<?php

namespace Kendo\UI;

class Slider extends \Kendo\UI\Widget {
    protected function name() {
        return 'Slider';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('input', true);
    }

//>> Properties

    /**
    * The title of the decrease button of the Slider.
    * @param string $value
    * @return \Kendo\UI\Slider
    */
    public function decreaseButtonTitle($value) {
        return $this->setProperty('decreaseButtonTitle', $value);
    }

    /**
    * The title of the increase button of the Slider.
    * @param string $value
    * @return \Kendo\UI\Slider
    */
    public function increaseButtonTitle($value) {
        return $this->setProperty('increaseButtonTitle', $value);
    }

    /**
    * The delta with which the value will change when the user presses the Page Up or Page Down key (the drag
handle must be focused). Note: The allied largeStep will also set large tick for every large step.
    * @param float $value
    * @return \Kendo\UI\Slider
    */
    public function largeStep($value) {
        return $this->setProperty('largeStep', $value);
    }

    /**
    * The maximum value of the Slider.
    * @param float $value
    * @return \Kendo\UI\Slider
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the Slider.
    * @param float $value
    * @return \Kendo\UI\Slider
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The orientation of a Slider: "horizontal" or "vertical".
    * @param string $value
    * @return \Kendo\UI\Slider
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    /**
    * Can be used to show (true) or hide (false) the
increase and decrease buttons of a Slider.
    * @param boolean $value
    * @return \Kendo\UI\Slider
    */
    public function showButtons($value) {
        return $this->setProperty('showButtons', $value);
    }

    /**
    * The small step value of the Slider. The underlying value will be changed when the end user
(1) clicks on the increase or decrease buttons of the Slider, (2) presses the arrow keys
(the drag handle must be focused), or (3) drags the drag handle.
    * @param float $value
    * @return \Kendo\UI\Slider
    */
    public function smallStep($value) {
        return $this->setProperty('smallStep', $value);
    }

    /**
    * Denotes the location of the tick marks in the Slider. The available options are:
    * @param string $value
    * @return \Kendo\UI\Slider
    */
    public function tickPlacement($value) {
        return $this->setProperty('tickPlacement', $value);
    }

    /**
    * Configuration of the Slider tooltip.
    * @param \Kendo\UI\SliderTooltip|array $value
    * @return \Kendo\UI\Slider
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The underlying value of the Slider.
    * @param float $value
    * @return \Kendo\UI\Slider
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the Slider.
    * Fires when the slider value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Slider
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the slide event of the Slider.
    * Fires when the user drags the drag handle to a new position.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Slider
    */
    public function slide($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('slide', $value);
    }


//<< Properties
}

?>
