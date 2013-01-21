<?php

namespace Kendo\UI;

class Splitter extends \Kendo\UI\Widget {
    public function name() {
        return 'Splitter';
    }
//>> Properties

    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    public function addPane(\Kendo\UI\SplitterPane $value) {
        return $this->add('panes', $value);
    }

    public function collapse($value) {
        return $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));
    }

    public function contentLoad($value) {
        return $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));
    }

    public function expand($value) {
        return $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));
    }

    public function layoutChange($value) {
        return $this->setProperty('layoutChange', new \Kendo\JavaScriptFunction($value));
    }

    public function resize($value) {
        return $this->setProperty('resize', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
