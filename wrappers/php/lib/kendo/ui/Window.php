<?php

namespace kendo\ui;

class Window extends \kendo\ui\Widget {
    public function name() {
        return 'Window';
    }
//>> Properties

    public function setActions($value) {
        $this->setProperty('actions', $value);

        return $this;
    }

    public function setAnimation(\kendo\ui\WindowAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setAppendTo($value) {
        $this->setProperty('appendTo', $value);

        return $this;
    }

    public function setDraggable($value) {
        $this->setProperty('draggable', $value);

        return $this;
    }

    public function setIframe($value) {
        $this->setProperty('iframe', $value);

        return $this;
    }

    public function setMaxHeight($value) {
        $this->setProperty('maxHeight', $value);

        return $this;
    }

    public function setMaxWidth($value) {
        $this->setProperty('maxWidth', $value);

        return $this;
    }

    public function setMinHeight($value) {
        $this->setProperty('minHeight', $value);

        return $this;
    }

    public function setMinWidth($value) {
        $this->setProperty('minWidth', $value);

        return $this;
    }

    public function setModal($value) {
        $this->setProperty('modal', $value);

        return $this;
    }

    public function setResizable($value) {
        $this->setProperty('resizable', $value);

        return $this;
    }

    public function setTitle($value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function setWidth($value) {
        $this->setProperty('width', $value);

        return $this;
    }

    public function setHeight($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function setContent($value) {
        $this->setProperty('content', $value);

        return $this;
    }

    public function setActivate($value) {
        $this->setProperty('activate', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setClose($value) {
        $this->setProperty('close', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDeactivate($value) {
        $this->setProperty('deactivate', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragend($value) {
        $this->setProperty('dragend', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragstart($value) {
        $this->setProperty('dragstart', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setError($value) {
        $this->setProperty('error', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setOpen($value) {
        $this->setProperty('open', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRefresh($value) {
        $this->setProperty('refresh', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setResize($value) {
        $this->setProperty('resize', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
