<?php

namespace Kendo\UI;

class NumericTextBox extends \Kendo\UI\Widget {
    public function name() {
        return 'NumericTextBox';
    }
//>> Properties

    public function culture($value) {
        $this->setProperty('culture', $value);

        return $this;
    }

    public function decimals($value) {
        $this->setProperty('decimals', $value);

        return $this;
    }

    public function downArrowText($value) {
        $this->setProperty('downArrowText', $value);

        return $this;
    }

    public function format($value) {
        $this->setProperty('format', $value);

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

    public function placeholder($value) {
        $this->setProperty('placeholder', $value);

        return $this;
    }

    public function spinners($value) {
        $this->setProperty('spinners', $value);

        return $this;
    }

    public function step($value) {
        $this->setProperty('step', $value);

        return $this;
    }

    public function upArrowText($value) {
        $this->setProperty('upArrowText', $value);

        return $this;
    }

    public function value($value) {
        $this->setProperty('value', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function spin($value) {
        $this->setProperty('spin', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
