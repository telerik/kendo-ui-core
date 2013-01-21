<?php

namespace Kendo\UI;

class SplitterPane extends \Kendo\SerializableObject {
//>> Properties

    public function collapsed($value) {
        return $this->setProperty('collapsed', $value);
    }

    public function collapsible($value) {
        return $this->setProperty('collapsible', $value);
    }

    public function contentUrl($value) {
        return $this->setProperty('contentUrl', $value);
    }

    public function max($value) {
        return $this->setProperty('max', $value);
    }

    public function min($value) {
        return $this->setProperty('min', $value);
    }

    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    public function scrollable($value) {
        return $this->setProperty('scrollable', $value);
    }

    public function size($value) {
        return $this->setProperty('size', $value);
    }

//<< Properties
}

?>
