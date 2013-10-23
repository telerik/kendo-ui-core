<?php

namespace Kendo\UI;

class TabStripItem extends \Kendo\SerializableObject {
    public function createElement() {
        $element = new \Kendo\Html\Element('li');

        if ($this->getProperty('selected')) {
            $element->attr('class', 'k-state-active');
        }

        if ($this->getProperty('enabled') === false) {
            $element->attr('disabled', 'disabled');
        }

        $text = $this->getProperty('text');

        if ($text) {
            $element->append(new \Kendo\Html\Text($text));
        }

        return $element;
    }

    public function createContentElement() {
        $content = $this->getProperty('content');
        $contentUrl = $this->getProperty('contentUrl');

        if ($content || $contentUrl) {
            $contentElement = new \Kendo\Html\Element('div');

            $contentElement->html($content);

            return $contentElement;
        }
    }

//>> Properties

    /**
    * Specifies the text displayed by the item
    * @param string $value
    * @return \Kendo\UI\TabStripItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Specifies the URL that the item links to
    * @param string $value
    * @return \Kendo\UI\TabStripItem
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

    /**
    * Specifies the URL of the image displayed by the item
    * @param string $value
    * @return \Kendo\UI\TabStripItem
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Specifies the class name for the sprite image displayed by the item
    * @param string $value
    * @return \Kendo\UI\TabStripItem
    */
    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    /**
    * Specifies whether the item is initially enabled
    * @param boolean $value
    * @return \Kendo\UI\TabStripItem
    */
    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    /**
    * Specifies whether the item is initially selected
    * @param boolean $value
    * @return \Kendo\UI\TabStripItem
    */
    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    /**
    * Specifies the url from which the item content will be loaded
    * @param string $value
    * @return \Kendo\UI\TabStripItem
    */
    public function contentUrl($value) {
        return $this->setProperty('contentUrl', $value);
    }

    /**
    * Sets the HTML content of the TabStripItem.
    * @param string $value
    * @return \Kendo\UI\TabStripItems    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Starts output bufferring. Any following markup will be set as the content of the TabStripItem.
    */
    public function startContent() {
        ob_start();
    }

    /**
    * Stops output bufferring and sets the preceding markup as the content of the TabStripItem.
    */
    public function endContent() {
        $this->content(ob_get_clean());
    }
    /**
    * Adds one or more \Kendo\UI\TabStripItem.
    * @param \Kendo\UI\TabStripItem|array,... $value
    * @return \Kendo\UI\TabStrip    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }
//<< Properties
}

?>
