<?php

namespace Kendo\UI;

class DatePicker extends \Kendo\UI\Widget {
    public function name() {
        return 'DatePicker';
    }
//>> Properties

    public function animation(\Kendo\UI\DatePickerAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    public function dates($value) {
        return $this->setProperty('dates', $value);
    }

    public function depth($value) {
        return $this->setProperty('depth', $value);
    }

    public function footer($value) {
        return $this->setProperty('footer', $value);
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

    public function month(\Kendo\UI\DatePickerMonth $value) {
        return $this->setProperty('month', $value);
    }

    public function parseFormats($value) {
        return $this->setProperty('parseFormats', $value);
    }

    public function start($value) {
        return $this->setProperty('start', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function close($value) {
        return $this->setProperty('close', new \Kendo\JavaScriptFunction($value));
    }

    public function open($value) {
        return $this->setProperty('open', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
