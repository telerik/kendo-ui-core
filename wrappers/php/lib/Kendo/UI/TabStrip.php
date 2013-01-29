<?php

namespace Kendo\UI;

class TabStrip extends \Kendo\UI\Widget {
    protected function name() {
        return 'TabStrip';
    }
//>> Properties

    /**
    * A collection of visual animations used when TabStrip tab are selected through
user interactions. Setting this option to false will disable all animations.
    * @param \Kendo\UI\TabStripAnimation $value
    */
    public function animation(\Kendo\UI\TabStripAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Specifies whether the TabStrip should be able to collapse completely when clicking an expanded tab.
    * @param boolean $value
    */
    public function collapsible($value) {
        return $this->setProperty('collapsible', $value);
    }

    /**
    * Sets the field of the data item that provides the text content of
the tab content element.
    * @param string $value
    */
    public function dataContentField($value) {
        return $this->setProperty('dataContentField', $value);
    }

    /**
    * Sets the field of the data item that provides the URL for
the ajax loaded tab content.
    * @param string $value
    */
    public function dataContentUrlField($value) {
        return $this->setProperty('dataContentUrlField', $value);
    }

    /**
    * Sets the field of the data item that provides the image URL of
the tab.
    * @param string $value
    */
    public function dataImageUrlField($value) {
        return $this->setProperty('dataImageUrlField', $value);
    }

    /**
    * Sets the field of the data item that provides the CSS class of
the tab.
    * @param string $value
    */
    public function dataSpriteCssClass($value) {
        return $this->setProperty('dataSpriteCssClass', $value);
    }

    /**
    * Sets the field of the data item that provides the text name of the tab.
    * @param string $value
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides the link URL for the
tab.
    * @param string $value
    */
    public function dataUrlField($value) {
        return $this->setProperty('dataUrlField', $value);
    }

    /**
    * Adds TabStripItem to the TabStrip.
    * @param \Kendo\UI\TabStripItem $value
    */
    public function addItem(\Kendo\UI\TabStripItem $value) {
        return $this->add('items', $value);
    }

    /**
    * Sets the activate event of the TabStrip.
    * Triggered just after a tab is being made visible, but before the end of the animation
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function activate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('activate', $value);
    }

    /**
    * Sets the contentLoad event of the TabStrip.
    * Triggered when content is fetched from an AJAX request.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function contentLoad($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('contentLoad', $value);
    }

    /**
    * Sets the error event of the TabStrip.
    * Triggered when an AJAX request results in an error.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function error($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('error', $value);
    }

    /**
    * Sets the select event of the TabStrip.
    * Triggered before a tab is selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

//<< Properties
}

?>
