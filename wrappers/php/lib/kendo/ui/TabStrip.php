<?php

namespace kendo\ui;

class TabStrip extends \kendo\ui\Widget {
    public function name() {
        return 'TabStrip';
    }
//>> Properties

    public function setAnimation(\kendo\ui\TabStripAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setCollapsible($value) {
        $this->setProperty('collapsible', $value);

        return $this;
    }

    public function setDataContentField($value) {
        $this->setProperty('dataContentField', $value);

        return $this;
    }

    public function setDataContentUrlField($value) {
        $this->setProperty('dataContentUrlField', $value);

        return $this;
    }

    public function setDataImageUrlField($value) {
        $this->setProperty('dataImageUrlField', $value);

        return $this;
    }

    public function setDataSpriteCssClass($value) {
        $this->setProperty('dataSpriteCssClass', $value);

        return $this;
    }

    public function setDataTextField($value) {
        $this->setProperty('dataTextField', $value);

        return $this;
    }

    public function setDataUrlField($value) {
        $this->setProperty('dataUrlField', $value);

        return $this;
    }

    public function addItem(\kendo\ui\TabStripItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setActivate($value) {
        $this->setProperty('activate', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setContentLoad($value) {
        $this->setProperty('contentLoad', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setError($value) {
        $this->setProperty('error', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
