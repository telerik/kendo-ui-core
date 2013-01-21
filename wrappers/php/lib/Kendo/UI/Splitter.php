<?php

namespace Kendo\UI;

class Splitter extends \Kendo\UI\Widget {
    public function name() {
        return 'Splitter';
    }
//>> Properties

    public function setOrientation($value) {
        $this->setProperty('orientation', $value);

        return $this;
    }

    public function addPane(\Kendo\UI\SplitterPane $value) {
        $values = $this->getProperty('panes');

        if ($values == null) {
            $values = array();
            $this->setProperty('panes', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setCollapse($value) {
        $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setContentLoad($value) {
        $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setExpand($value) {
        $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setLayoutChange($value) {
        $this->setProperty('layoutChange', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setResize($value) {
        $this->setProperty('resize', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
