<?php

namespace Kendo\UI;

class NumericTextBox extends \Kendo\UI\Widget {
    protected function name() {
        return 'NumericTextBox';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('input', true);
    }
//>> Properties

    /**
    * Specifies the culture info used by the widget.
    * @param string $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Specifies the number precision. If not set precision defined by current culture is used.
    * @param float $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function decimals($value) {
        return $this->setProperty('decimals', $value);
    }

    /**
    * Specifies the text of the tooltip on the down arrow.
    * @param string $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function downArrowText($value) {
        return $this->setProperty('downArrowText', $value);
    }

    /**
    * Specifies the format of the number. Any valid number format is allowed.
    * @param string $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Specifies the largest value the user can enter.
    * @param float $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the smallest value the user can enter.
    * @param float $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The hint displayed by the widget when it is empty. Not set by default.
    * @param string $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    /**
    * Specifies whether the up and down spin buttons should be rendered
    * @param boolean $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function spinners($value) {
        return $this->setProperty('spinners', $value);
    }

    /**
    * Specifies the value used to increment or decrement widget value.
    * @param float $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * Specifies the text of the tooltip on the up arrow.
    * @param string $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function upArrowText($value) {
        return $this->setProperty('upArrowText', $value);
    }

    /**
    * Specifies the value of the NumericTextBox widget.
    * @param float $value
    * @return \Kendo\UI\NumericTextBox
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the NumericTextBox.
    * Fires when the value is changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\NumericTextBox
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the spin event of the NumericTextBox.
    * Fires when the value is changed from the spin buttons
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\NumericTextBox
    */
    public function spin($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('spin', $value);
    }


//<< Properties
}

?>
