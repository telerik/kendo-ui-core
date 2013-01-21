<?php

namespace Kendo\UI;

class TabStrip extends \Kendo\UI\Widget {
    public function name() {
        return 'TabStrip';
    }
//>> Properties

    public function setAnimation(\Kendo\UI\TabStripAnimation $value) {
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

    public function addItem(\Kendo\UI\TabStripItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setActivate($value) {
        $this->setProperty('activate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setContentLoad($value) {
        $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setError($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
