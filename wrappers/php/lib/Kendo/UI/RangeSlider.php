<?php

namespace Kendo\UI;

class RangeSlider extends \Kendo\UI\Widget {
    protected function name() {
        return 'RangeSlider';
    }

    protected function createElement() {
        $element = parent::createElement();

        $element->append($this->createInput("$this->id[0]", 'selectionStart'));
        $element->append($this->createInput("$this->id[1]", 'selectionEnd'));

        return $element;
    }

    private function createInput($name, $propertyName) {
        $element = new \Kendo\Html\Element('input', true);

        $element->attr('name', $name);
        $element->attr('type', 'range');

        if ($this->getProperty('min') !== null) {
            $element->attr('min', $this->getProperty('min'));
        }

        if ($this->getProperty('max') !== null) {
            $element->attr('max', $this->getProperty('max'));
        }

        if ($this->getProperty('step') !== null) {
            $element->attr('step', $this->getProperty('step'));
        }

        if ($this->getProperty($propertyName) !== null) {
            $element->attr('value', $this->getProperty($propertyName));
        }

        return $element;
    }
//>> Properties

    /**
    * The delta with which the value will change when the user presses the Page Up or Page Down key (the drag
handle must be focused). Note: The allied largeStep will also set large tick for every large step.
    * @param float $value
    * @return \Kendo\UI\RangeSlider
    */
    public function largeStep($value) {
        return $this->setProperty('largeStep', $value);
    }

    /**
    * The maximum value of the RangeSlider.
    * @param float $value
    * @return \Kendo\UI\RangeSlider
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the RangeSlider.
    * @param float $value
    * @return \Kendo\UI\RangeSlider
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * F
The orientation of a RangeSlider; "horizontal" or
"vertical".
    * @param string $value
    * @return \Kendo\UI\RangeSlider
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    /**
    * The selection end value of the RangeSlider.
    * @param float $value
    * @return \Kendo\UI\RangeSlider
    */
    public function selectionEnd($value) {
        return $this->setProperty('selectionEnd', $value);
    }

    /**
    * The selection start value of the RangeSlider.
    * @param float $value
    * @return \Kendo\UI\RangeSlider
    */
    public function selectionStart($value) {
        return $this->setProperty('selectionStart', $value);
    }

    /**
    * The small step value of the RangeSlider. The underlying value will be changed when the end
user (1) clicks on the increase or decrease buttons of the RangeSlider, (2) presses the
arrow keys (the drag handle must be focused), or (3) drags the drag handle.
    * @param float $value
    * @return \Kendo\UI\RangeSlider
    */
    public function smallStep($value) {
        return $this->setProperty('smallStep', $value);
    }

    /**
    * Denotes the location of the tick marks in the RangeSlider. The available options are:
    * @param string $value
    * @return \Kendo\UI\RangeSlider
    */
    public function tickPlacement($value) {
        return $this->setProperty('tickPlacement', $value);
    }

    /**
    * Configuration of the RangeSlider tooltip.
    * @param \Kendo\UI\RangeSliderTooltip|array $value
    * @return \Kendo\UI\RangeSlider
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * Sets the change event of the RangeSlider.
    * Fires when the rangeSlider value changes as a result of selecting a new value with one of the drag handles or the keyboard.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\RangeSlider
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the slide event of the RangeSlider.
    * Fires when the user drags the drag handle to a new position.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\RangeSlider
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
