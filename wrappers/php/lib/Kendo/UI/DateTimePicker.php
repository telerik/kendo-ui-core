<?php

namespace Kendo\UI;

class DateTimePicker extends \Kendo\UI\Widget {
    public function name() {
        return 'DateTimePicker';
    }
//>> Properties

    public function animation(\Kendo\UI\DateTimePickerAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function culture($value) {
        $this->setProperty('culture', $value);

        return $this;
    }

    public function dates($value) {
        $this->setProperty('dates', $value);

        return $this;
    }

    public function depth($value) {
        $this->setProperty('depth', $value);

        return $this;
    }

    public function footer($value) {
        $this->setProperty('footer', $value);

        return $this;
    }

    public function format($value) {
        $this->setProperty('format', $value);

        return $this;
    }

    public function interval($value) {
        $this->setProperty('interval', $value);

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

    public function month(\Kendo\UI\DateTimePickerMonth $value) {
        $this->setProperty('month', $value);

        return $this;
    }

    public function parseFormats($value) {
        $this->setProperty('parseFormats', $value);

        return $this;
    }

    public function start($value) {
        $this->setProperty('start', $value);

        return $this;
    }

    public function timeFormat($value) {
        $this->setProperty('timeFormat', $value);

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

    public function close($value) {
        $this->setProperty('close', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function open($value) {
        $this->setProperty('open', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
