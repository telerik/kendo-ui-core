<?php

namespace Kendo\UI;

class DatePicker extends \Kendo\UI\Widget {
    public function name() {
        return 'DatePicker';
    }
//>> Properties

    public function setAnimation(\Kendo\UI\DatePickerAnimation $value) {
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

    public function setDepth($value) {
        $this->setProperty('depth', $value);

        return $this;
    }

    public function setFooter($value) {
        $this->setProperty('footer', $value);

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

    public function setMonth(\Kendo\UI\DatePickerMonth $value) {
        $this->setProperty('month', $value);

        return $this;
    }

    public function setParseFormats($value) {
        $this->setProperty('parseFormats', $value);

        return $this;
    }

    public function setStart($value) {
        $this->setProperty('start', $value);

        return $this;
    }

    public function setValue($value) {
        $this->setProperty('value', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setClose($value) {
        $this->setProperty('close', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setOpen($value) {
        $this->setProperty('open', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
