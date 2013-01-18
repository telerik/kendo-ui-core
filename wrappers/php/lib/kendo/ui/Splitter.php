<?php

namespace kendo\ui;

class Splitter extends \kendo\ui\Widget {
    public function name() {
        return 'Splitter';
    }
//>> Properties

    public function setOrientation($value) {
        $this->setProperty('orientation', $value);

        return $this;
    }

    public function addPane(\kendo\ui\SplitterPane $value) {
        $values = $this->getProperty('panes');

        if ($values == null) {
            $values = array();
            $this->setProperty('panes', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setCollapse($value) {
        $this->setProperty('collapse', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setContentLoad($value) {
        $this->setProperty('contentLoad', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setExpand($value) {
        $this->setProperty('expand', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setLayoutChange($value) {
        $this->setProperty('layoutChange', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setResize($value) {
        $this->setProperty('resize', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
