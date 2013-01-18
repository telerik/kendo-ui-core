<?php

namespace kendo\ui;

class AutoComplete extends \kendo\ui\Widget {
    public function name() {
        return 'AutoComplete';
    }

    protected function createElement() {
        return new \kendo\html\Element('input', true);
    }
//>> Properties

    public function setAnimation(\kendo\ui\AutoCompleteAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setDataSource(\kendo\data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setDataTextField($value) {
        $this->setProperty('dataTextField', $value);

        return $this;
    }

    public function setDelay($value) {
        $this->setProperty('delay', $value);

        return $this;
    }

    public function setEnable($value) {
        $this->setProperty('enable', $value);

        return $this;
    }

    public function setFilter($value) {
        $this->setProperty('filter', $value);

        return $this;
    }

    public function setHeight($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function setHighlightFirst($value) {
        $this->setProperty('highlightFirst', $value);

        return $this;
    }

    public function setIgnoreCase($value) {
        $this->setProperty('ignoreCase', $value);

        return $this;
    }

    public function setMinLength($value) {
        $this->setProperty('minLength', $value);

        return $this;
    }

    public function setPlaceholder($value) {
        $this->setProperty('placeholder', $value);

        return $this;
    }

    public function setSeparator($value) {
        $this->setProperty('separator', $value);

        return $this;
    }

    public function setSuggest($value) {
        $this->setProperty('suggest', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

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

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setOpen($value) {
        $this->setProperty('open', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
