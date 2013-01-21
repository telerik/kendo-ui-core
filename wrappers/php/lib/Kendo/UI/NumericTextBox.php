<?php

namespace Kendo\UI;

class NumericTextBox extends \Kendo\UI\Widget {
    public function name() {
        return 'NumericTextBox';
    }
//>> Properties

    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    public function decimals($value) {
        return $this->setProperty('decimals', $value);
    }

    public function downArrowText($value) {
        return $this->setProperty('downArrowText', $value);
    }

    public function format($value) {
        return $this->setProperty('format', $value);
    }

    public function max($value) {
        return $this->setProperty('max', $value);
    }

    public function min($value) {
        return $this->setProperty('min', $value);
    }

    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    public function spinners($value) {
        return $this->setProperty('spinners', $value);
    }

    public function step($value) {
        return $this->setProperty('step', $value);
    }

    public function upArrowText($value) {
        return $this->setProperty('upArrowText', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function spin($value) {
        return $this->setProperty('spin', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
