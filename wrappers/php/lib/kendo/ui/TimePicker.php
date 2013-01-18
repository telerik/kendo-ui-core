<?php

namespace kendo\ui;

class TimePicker extends \kendo\ui\Widget {
    public function name() {
        return 'TimePicker';
    }
//>> Properties

    public function setAnimation(\kendo\ui\TimePickerAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setCulture($value) {
        $this->setProperty('culture', $value);

        return $this;
    }

    public function setDates($value) {
        $this->setProperty('dates', $value);

        return $this;
    }

    public function setFormat($value) {
        $this->setProperty('format', $value);

        return $this;
    }

    public function setInterval($value) {
        $this->setProperty('interval', $value);

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

    public function setParseFormats($value) {
        $this->setProperty('parseFormats', $value);

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

    public function setClose($value) {
        $this->setProperty('close', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setOpen($value) {
        $this->setProperty('open', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
