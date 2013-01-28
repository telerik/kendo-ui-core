<?php

namespace Kendo\UI;

class PanelBarItem extends \Kendo\SerializableObject {
    function __construct($text = null) {
        $this->text($text);
    }

    public function startContent() {
        ob_start();
    }

    public function createElement() {
        $element = new \Kendo\Html\Element('li');

        if ($this->getProperty('expanded')) {
            $element->attr('class', 'k-state-active');
        }

        if ($this->getProperty('enabled') === false) {
            $element->attr('disabled', 'disabled');
        }

        $text = $this->getProperty('text');

        if ($text) {
            $element->append(new \Kendo\Html\Text($text));
        }

        $content = $this->getProperty('content');

        if ($content) {
            $contentElement = new \Kendo\Html\Element('div');

            $contentElement->html($content);

            $element->append($contentElement);
        }

        $items = $this->getProperty('items');

        if ($items) {
            $itemContainer = new \Kendo\Html\Element('ul');

            foreach($items as $item) {
                $itemContainer->append($item->createElement());
            }

            $element->append($itemContainer);
        }

        return $element;
    }

    public function endContent() {
        $this->content(ob_get_clean());
    }

    public function content($value) {
        return $this->setProperty('content', $value);
    }

    public function addItem(\Kendo\UI\PanelBarItem $item) {
        return $this->add('items', $item);
    }

//>> Properties

    public function text($value) {
        return $this->setProperty('text', $value);
    }

    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    public function expanded($value) {
        return $this->setProperty('expanded', $value);
    }

    public function contentUrl($value) {
        return $this->setProperty('contentUrl', $value);
    }

//<< Properties
}

?>
