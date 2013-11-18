<?php

namespace Kendo\UI;

class Splitter extends \Kendo\UI\Widget {
    protected function name() {
        return 'Splitter';
    }

    protected function createElement() {
        $element = new \Kendo\Html\Element('div');
        $element->attr('class', 'k-splitter');

        $panes = $this->getProperty('panes');

        if (isset($panes)) {
            foreach ($panes as $pane) {
                $element->append($pane->createElement());
            }
        }

        return $element;
    }
//>> Properties

    /**
    * Specifies the orientation of the widget. Supported values are "horizontal" and "vertical".
    * @param string $value
    * @return \Kendo\UI\Splitter
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

    /**
    * Adds SplitterPane to the Splitter.
    * @param \Kendo\UI\SplitterPane|array,... $value one or more SplitterPane to add.
    * @return \Kendo\UI\Splitter
    */
    public function addPane($value) {
        return $this->add('panes', func_get_args());
    }

    /**
    * Sets the collapse event of the Splitter.
    * Triggered when a pane of a Splitter is collapsed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Splitter
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
    * @return \Kendo\UI\Splitter
    */
    public function contentLoad($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('contentLoad', $value);
    }

    /**
    * Sets the error event of the Splitter.
    * Triggered when the AJAX request that fetches a pane content has failed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Splitter
    */
    public function error($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('error', $value);
    }

    /**
    * Sets the expand event of the Splitter.
    * Triggered when a pane of a Splitter is expanded.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Splitter
    */
    public function expand($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('expand', $value);
    }

    /**
    * Sets the layoutChange event of the Splitter.
    * This event is now obsolete and will be removed in the future. Please use the resize event instead.Fires when the splitter layout has changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Splitter
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
    * @return \Kendo\UI\Splitter
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
