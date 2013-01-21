<?php

namespace Kendo\UI;

class TabStrip extends \Kendo\UI\Widget {
    public function name() {
        return 'TabStrip';
    }
//>> Properties

    public function animation(\Kendo\UI\TabStripAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    public function collapsible($value) {
        return $this->setProperty('collapsible', $value);
    }

    public function dataContentField($value) {
        return $this->setProperty('dataContentField', $value);
    }

    public function dataContentUrlField($value) {
        return $this->setProperty('dataContentUrlField', $value);
    }

    public function dataImageUrlField($value) {
        return $this->setProperty('dataImageUrlField', $value);
    }

    public function dataSpriteCssClass($value) {
        return $this->setProperty('dataSpriteCssClass', $value);
    }

    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    public function dataUrlField($value) {
        return $this->setProperty('dataUrlField', $value);
    }

    public function addItem(\Kendo\UI\TabStripItem $value) {
        return $this->add('items', $value);
    }

    public function activate($value) {
        return $this->setProperty('activate', new \Kendo\JavaScriptFunction($value));
    }

    public function contentLoad($value) {
        return $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));
    }

    public function error($value) {
        return $this->setProperty('error', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
