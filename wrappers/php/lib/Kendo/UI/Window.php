<?php

namespace Kendo\UI;

class Window extends \Kendo\UI\Widget {
    protected $ignore = array('content');

    public function name() {
        return 'Window';
    }

    protected function createElement() {
        $element = new \Kendo\Html\Element('div');

        $element->html($this->getProperty('content'));

        return $element;
    }
//>> Properties

    public function actions($value) {
        return $this->setProperty('actions', $value);
    }

    public function animation(\Kendo\UI\WindowAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    public function appendTo($value) {
        return $this->setProperty('appendTo', $value);
    }

    public function draggable($value) {
        return $this->setProperty('draggable', $value);
    }

    public function iframe($value) {
        return $this->setProperty('iframe', $value);
    }

    public function maxHeight($value) {
        return $this->setProperty('maxHeight', $value);
    }

    public function maxWidth($value) {
        return $this->setProperty('maxWidth', $value);
    }

    public function minHeight($value) {
        return $this->setProperty('minHeight', $value);
    }

    public function minWidth($value) {
        return $this->setProperty('minWidth', $value);
    }

    public function modal($value) {
        return $this->setProperty('modal', $value);
    }

    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    public function title($value) {
        return $this->setProperty('title', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

    public function height($value) {
        return $this->setProperty('height', $value);
    }

    public function content($value) {
        return $this->setProperty('content', $value);
    }

    public function activate($value) {
        return $this->setProperty('activate', new \Kendo\JavaScriptFunction($value));
    }

    public function close($value) {
        return $this->setProperty('close', new \Kendo\JavaScriptFunction($value));
    }

    public function deactivate($value) {
        return $this->setProperty('deactivate', new \Kendo\JavaScriptFunction($value));
    }

    public function dragend($value) {
        return $this->setProperty('dragend', new \Kendo\JavaScriptFunction($value));
    }

    public function dragstart($value) {
        return $this->setProperty('dragstart', new \Kendo\JavaScriptFunction($value));
    }

    public function error($value) {
        return $this->setProperty('error', new \Kendo\JavaScriptFunction($value));
    }

    public function open($value) {
        return $this->setProperty('open', new \Kendo\JavaScriptFunction($value));
    }

    public function refresh($value) {
        return $this->setProperty('refresh', new \Kendo\JavaScriptFunction($value));
    }

    public function resize($value) {
        return $this->setProperty('resize', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
