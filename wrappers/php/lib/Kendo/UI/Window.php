<?php

namespace Kendo\UI;

class Window extends \Kendo\UI\Widget {
    public function name() {
        return 'Window';
    }
//>> Properties

    public function actions($value) {
        $this->setProperty('actions', $value);

        return $this;
    }

    public function animation(\Kendo\UI\WindowAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function appendTo($value) {
        $this->setProperty('appendTo', $value);

        return $this;
    }

    public function draggable($value) {
        $this->setProperty('draggable', $value);

        return $this;
    }

    public function iframe($value) {
        $this->setProperty('iframe', $value);

        return $this;
    }

    public function maxHeight($value) {
        $this->setProperty('maxHeight', $value);

        return $this;
    }

    public function maxWidth($value) {
        $this->setProperty('maxWidth', $value);

        return $this;
    }

    public function minHeight($value) {
        $this->setProperty('minHeight', $value);

        return $this;
    }

    public function minWidth($value) {
        $this->setProperty('minWidth', $value);

        return $this;
    }

    public function modal($value) {
        $this->setProperty('modal', $value);

        return $this;
    }

    public function resizable($value) {
        $this->setProperty('resizable', $value);

        return $this;
    }

    public function title($value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function width($value) {
        $this->setProperty('width', $value);

        return $this;
    }

    public function height($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function content($value) {
        $this->setProperty('content', $value);

        return $this;
    }

    public function activate($value) {
        $this->setProperty('activate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function close($value) {
        $this->setProperty('close', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function deactivate($value) {
        $this->setProperty('deactivate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dragend($value) {
        $this->setProperty('dragend', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dragstart($value) {
        $this->setProperty('dragstart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function error($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function open($value) {
        $this->setProperty('open', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function refresh($value) {
        $this->setProperty('refresh', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function resize($value) {
        $this->setProperty('resize', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
