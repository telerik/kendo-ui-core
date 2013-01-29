<?php

namespace Kendo\UI;

class NumericTextBox extends \Kendo\UI\Widget {
    protected function name() {
        return 'NumericTextBox';
    }
//>> Properties

    /**
    * Specifies the culture info used by the NumericTextBox widget.
    * @param string $value
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Specifies the number precision. If not set precision defined by current culture is used.
    * @param float $value
    */
    public function decimals($value) {
        return $this->setProperty('decimals', $value);
    }

    /**
    * Specifies the text of the tooltip on the down arrow.
    * @param string $value
    */
    public function downArrowText($value) {
        return $this->setProperty('downArrowText', $value);
    }

    /**
    * Specifies the format of the number. Any valid number format is allowed.
    * @param string $value
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Specifies the largest value the user can enter.
    * @param float $value
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the smallest value the user can enter.
    * @param float $value
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Specifies the text displayed when the input is empty.
    * @param string $value
    */
    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    /**
    * Specifies whether the up/down spin buttons should be rendered
    * @param boolean $value
    */
    public function spinners($value) {
        return $this->setProperty('spinners', $value);
    }

    /**
    * Specifies the increment/decrement step.
    * @param float $value
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * Specifies the text of the tooltip on the up arrow.
    * @param string $value
    */
    public function upArrowText($value) {
        return $this->setProperty('upArrowText', $value);
    }

    /**
    * Specifies the value of the NumericTextBox widget.
    * @param float $value
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the NumericTextBox.
    * Fires when the value is changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
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
