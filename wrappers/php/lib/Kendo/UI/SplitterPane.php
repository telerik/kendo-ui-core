<?php

namespace Kendo\UI;

class SplitterPane extends \Kendo\SerializableObject {
//>> Properties

    public function setCollapsed($value) {
        $this->setProperty('collapsed', $value);

        return $this;
    }

    public function setCollapsible($value) {
        $this->setProperty('collapsible', $value);

        return $this;
    }

    public function setContentUrl($value) {
        $this->setProperty('contentUrl', $value);

        return $this;
    }

    public function setMax($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function setMin($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function setResizable($value) {
        $this->setProperty('resizable', $value);

        return $this;
    }

    public function setScrollable($value) {
        $this->setProperty('scrollable', $value);

        return $this;
    }

    public function setSize($value) {
        $this->setProperty('size', $value);

        return $this;
    }

//<< Properties
}

?>
