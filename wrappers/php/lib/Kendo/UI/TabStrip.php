<?php

namespace Kendo\UI;

class TabStrip extends \Kendo\UI\Widget {
    public function name() {
        return 'TabStrip';
    }
//>> Properties

    public function animation(\Kendo\UI\TabStripAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function collapsible($value) {
        $this->setProperty('collapsible', $value);

        return $this;
    }

    public function dataContentField($value) {
        $this->setProperty('dataContentField', $value);

        return $this;
    }

    public function dataContentUrlField($value) {
        $this->setProperty('dataContentUrlField', $value);

        return $this;
    }

    public function dataImageUrlField($value) {
        $this->setProperty('dataImageUrlField', $value);

        return $this;
    }

    public function dataSpriteCssClass($value) {
        $this->setProperty('dataSpriteCssClass', $value);

        return $this;
    }

    public function dataTextField($value) {
        $this->setProperty('dataTextField', $value);

        return $this;
    }

    public function dataUrlField($value) {
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

    public function activate($value) {
        $this->setProperty('activate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function contentLoad($value) {
        $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function error($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
