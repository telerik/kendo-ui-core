<?php

namespace Kendo\UI;

class SplitterPane extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies whether a pane is initially collapsed (true) or expanded (true).
    * @param boolean $value
    * @return \Kendo\UI\SplitterPane
    */
    public function collapsed($value) {
        return $this->setProperty('collapsed', $value);
    }

    /**
    * Specifies whether a pane is collapsible (true) or not collapsible (false).
    * @param boolean $value
    * @return \Kendo\UI\SplitterPane
    */
    public function collapsible($value) {
        return $this->setProperty('collapsible', $value);
    }

    /**
    * Specifies the URL from which to load the content of a pane.
    * @param string $value
    * @return \Kendo\UI\SplitterPane
    */
    public function contentUrl($value) {
        return $this->setProperty('contentUrl', $value);
    }

    /**
    * Specifies the maximum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
size of a resized pane cannot exceed the defined maximum size.
    * @param string $value
    * @return \Kendo\UI\SplitterPane
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the minimum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
size of a resized pane cannot be less than the defined minimum size.
    * @param string $value
    * @return \Kendo\UI\SplitterPane
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Specifies whether a pane is resizable (true) or not resizable (false).
    * @param boolean $value
    * @return \Kendo\UI\SplitterPane
    */
    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    /**
    * Specifies whether a pane is scrollable (true) or not scrollable (false).
    * @param boolean $value
    * @return \Kendo\UI\SplitterPane
    */
    public function scrollable($value) {
        return $this->setProperty('scrollable', $value);
    }

    /**
    * Specifies the size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). Note: This
value must not exceed panes.max or be less then panes.min.
    * @param string $value
    * @return \Kendo\UI\SplitterPane
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

//<< Properties
}

?>
