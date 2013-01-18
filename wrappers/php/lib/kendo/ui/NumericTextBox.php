<?php

namespace kendo\ui;

class NumericTextBox extends \kendo\ui\Widget {
    public function name() {
        return 'NumericTextBox';
    }
//>> Properties

    public function setCulture($value) {
        $this->setProperty('culture', $value);

        return $this;
    }

    public function setDecimals($value) {
        $this->setProperty('decimals', $value);

        return $this;
    }

    public function setDownArrowText($value) {
        $this->setProperty('downArrowText', $value);

        return $this;
    }

    public function setFormat($value) {
        $this->setProperty('format', $value);

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

    public function setPlaceholder($value) {
        $this->setProperty('placeholder', $value);

        return $this;
    }

    public function setSpinners($value) {
        $this->setProperty('spinners', $value);

        return $this;
    }

    public function setStep($value) {
        $this->setProperty('step', $value);

        return $this;
    }

    public function setUpArrowText($value) {
        $this->setProperty('upArrowText', $value);

        return $this;
    }

    public function setValue($value) {
        $this->setProperty('value', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSpin($value) {
        $this->setProperty('spin', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
