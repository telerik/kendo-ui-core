<?php

namespace Kendo\UI;

class TabStrip extends \Kendo\UI\Widget {
    protected $ignore = array('items');

    protected function name() {
        return 'TabStrip';
    }

    protected function createElement() {
        $element = new \Kendo\Html\Element('div');

        $tabs = new \Kendo\Html\Element('ul');
        $element->append($tabs);

        $items = $this->getProperty('items');

        $hasContentUrls = false;
        $contentUrls = array();

        if ($items) {
            foreach($items as $item) {
                $tabs->append($item->createElement());

                if ($hasContentUrls == false) {
                    $hasContentUrls = strlen($item->getProperty("contentUrl"));
                }

                $contentUrls[] = $item->getProperty("contentUrl");

                $contentElement = $item->createContentElement();

                if ($contentElement) {
                    $element->append($contentElement);
                }
            }
        }

        if ($hasContentUrls) {
            $this->setProperty('contentUrls', $contentUrls);
        }

        return $element;
    }

    public function html() {
        $element = $this->createElement();

        $wrapper = new \Kendo\Html\Element('div');
        $wrapper->attr('class', 'k-tabstrip-wrapper');
        $wrapper->append($element);

        $this->addAttributes($element);

        return $wrapper->outerHtml();
    }

    /**
    * Sets the data of the TabStrip.
    * @param array $value
    * @return \Kendo\UI\TabStrip
    */
    public function dataSource(array $value) {
        return $this->setProperty('dataSource', $value);
    }

//>> Properties

    /**
    * A collection of visual animations used when TabStrip tab are selected through
user interactions. Setting this option to false will disable all animations.
    * @param boolean|\Kendo\UI\TabStripAnimation|array $value
    * @return \Kendo\UI\TabStrip
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Specifies whether the TabStrip should be able to collapse completely when clicking an expanded tab.
    * @param boolean $value
    * @return \Kendo\UI\TabStrip
    */
    public function collapsible($value) {
        return $this->setProperty('collapsible', $value);
    }

    /**
    * Sets an array with the URLs from which the tabs content to be loaded from. If only specific tabs should be loaded via Ajax, then you should set the URLs to the corresponding positions in the array and set the other elements to null.
    * @param array $value
    * @return \Kendo\UI\TabStrip
    */
    public function contentUrls($value) {
        return $this->setProperty('contentUrls', $value);
    }

    /**
    * Sets the field of the data item that provides the text content of
the tab content element.
    * @param string $value
    * @return \Kendo\UI\TabStrip
    */
    public function dataContentField($value) {
        return $this->setProperty('dataContentField', $value);
    }

    /**
    * Sets the field of the data item that provides the URL for
the ajax loaded tab content.
    * @param string $value
    * @return \Kendo\UI\TabStrip
    */
    public function dataContentUrlField($value) {
        return $this->setProperty('dataContentUrlField', $value);
    }

    /**
    * Sets the field of the data item that provides the image URL of
the tab.
    * @param string $value
    * @return \Kendo\UI\TabStrip
    */
    public function dataImageUrlField($value) {
        return $this->setProperty('dataImageUrlField', $value);
    }

    /**
    * Sets the field of the data item that provides the CSS class of
the tab.
    * @param string $value
    * @return \Kendo\UI\TabStrip
    */
    public function dataSpriteCssClass($value) {
        return $this->setProperty('dataSpriteCssClass', $value);
    }

    /**
    * Sets the field of the data item that provides the text name of the tab.
    * @param string $value
    * @return \Kendo\UI\TabStrip
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides the link URL for the
tab.
    * @param string $value
    * @return \Kendo\UI\TabStrip
    */
    public function dataUrlField($value) {
        return $this->setProperty('dataUrlField', $value);
    }

    /**
    * Specifies whether the TabStrip should be keyboard navigatable.
    * @param boolean $value
    * @return \Kendo\UI\TabStrip
    */
    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    /**
    * Adds TabStripItem to the TabStrip.
    * @param \Kendo\UI\TabStripItem|array,... $value one or more TabStripItem to add.
    * @return \Kendo\UI\TabStrip
    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }

    /**
    * Sets the activate event of the TabStrip.
    * Triggered after a tab is being made visible and its animation complete. Before Q2 2014 this event was invoked after tab show, but before the end of the animation.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TabStrip
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
    * @return \Kendo\UI\TabStrip
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
    * @return \Kendo\UI\TabStrip
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
    * @return \Kendo\UI\TabStrip
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the show event of the TabStrip.
    * Triggered just after a tab is being made visible, but before the end of the animation. Before Q2 2014 this event was called activate.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TabStrip
    */
    public function show($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('show', $value);
    }


//<< Properties
}

?>
