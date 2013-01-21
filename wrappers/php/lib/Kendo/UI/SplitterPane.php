<?php

namespace Kendo\UI;

class SplitterPane extends \Kendo\SerializableObject {
//>> Properties

    public function collapsed($value) {
        $this->setProperty('collapsed', $value);

        return $this;
    }

    public function collapsible($value) {
        $this->setProperty('collapsible', $value);

        return $this;
    }

    public function contentUrl($value) {
        $this->setProperty('contentUrl', $value);

        return $this;
    }

    public function max($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function min($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function resizable($value) {
        $this->setProperty('resizable', $value);

        return $this;
    }

    public function scrollable($value) {
        $this->setProperty('scrollable', $value);

        return $this;
    }

    public function size($value) {
        $this->setProperty('size', $value);

        return $this;
    }

//<< Properties
}

?>
