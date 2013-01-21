<?php

namespace Kendo\UI;

class Calendar extends \Kendo\UI\Widget {
    public function name() {
        return 'Calendar';
    }
//>> Properties

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

    public function max($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function min($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function month(\Kendo\UI\CalendarMonth $value) {
        $this->setProperty('month', $value);

        return $this;
    }

    public function start($value) {
        $this->setProperty('start', $value);

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

    public function navigate($value) {
        $this->setProperty('navigate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
