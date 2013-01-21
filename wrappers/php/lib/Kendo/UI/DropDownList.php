<?php

namespace Kendo\UI;

class DropDownList extends \Kendo\UI\Widget {
    public function name() {
        return 'DropDownList';
    }
//>> Properties

    public function setAnimation(\Kendo\UI\DropDownListAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setAutoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function setCascadeFrom($value) {
        $this->setProperty('cascadeFrom', $value);

        return $this;
    }

    public function setDataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setDataTextField($value) {
        $this->setProperty('dataTextField', $value);

        return $this;
    }

    public function setDataValueField($value) {
        $this->setProperty('dataValueField', $value);

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

    public function setHeight($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function setIgnoreCase($value) {
        $this->setProperty('ignoreCase', $value);

        return $this;
    }

    public function setIndex($value) {
        $this->setProperty('index', $value);

        return $this;
    }

    public function setOptionLabel($value) {
        $this->setProperty('optionLabel', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function setText($value) {
        $this->setProperty('text', $value);

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

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setOpen($value) {
        $this->setProperty('open', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setCascade($value) {
        $this->setProperty('cascade', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
