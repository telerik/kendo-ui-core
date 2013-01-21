<?php

namespace Kendo\UI;

class Splitter extends \Kendo\UI\Widget {
    public function name() {
        return 'Splitter';
    }
//>> Properties

    public function orientation($value) {
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

    public function collapse($value) {
        $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function contentLoad($value) {
        $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function expand($value) {
        $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function layoutChange($value) {
        $this->setProperty('layoutChange', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function resize($value) {
        $this->setProperty('resize', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
