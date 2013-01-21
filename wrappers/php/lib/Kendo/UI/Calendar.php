<?php

namespace Kendo\UI;

class Calendar extends \Kendo\UI\Widget {
    public function name() {
        return 'Calendar';
    }
//>> Properties

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

    public function month(\Kendo\UI\CalendarMonth $value) {
        return $this->setProperty('month', $value);
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

    public function navigate($value) {
        return $this->setProperty('navigate', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
