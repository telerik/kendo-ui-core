<?php

namespace Kendo\UI;

class Splitter extends \Kendo\UI\Widget {
    protected function name() {
        return 'Splitter';
    }
//>> Properties

    /**
    * Specifies the orientation of the Splitter.
    * @param string $value
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    /**
    * Adds SplitterPane to the Splitter.
    * @param \Kendo\UI\SplitterPane,... $value one or more SplitterPane to add.
    */
    public function addPane(\Kendo\UI\SplitterPane $value) {
        return $this->add('panes', func_get_args());
    }

    /**
    * Sets the collapse event of the Splitter.
    * Triggered when a pane of a Splitter is collapsed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function collapse($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('collapse', $value);
    }

    /**
    * Sets the contentLoad event of the Splitter.
    * Triggered when the content for a pane has finished loading.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function contentLoad($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('contentLoad', $value);
    }

    /**
    * Sets the expand event of the Splitter.
    * Triggered when a pane of a Splitter is expanded.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function expand($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('expand', $value);
    }

    /**
    * Sets the layoutChange event of the Splitter.
    * Fires when the splitter layout has changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function layoutChange($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('layoutChange', $value);
    }

    /**
    * Sets the resize event of the Splitter.
    * Triggered when a pane is resized.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function resize($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('resize', $value);
    }

//<< Properties
}

?>
