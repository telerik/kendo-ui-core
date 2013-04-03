<?php

namespace Kendo\UI;

abstract class NavigationalItem extends \Kendo\SerializableObject {

    public function renderText($element) {
        $text = $this->getProperty('text');
        $url = $this->getProperty('url');

        if ($text) {
            $container = $element;
            $textElement = new \Kendo\Html\Text($text);

            if ($url) {
                $container = new \Kendo\Html\Element('a');
                $container->attr('href', $url);
                $element->append($container);
            }

            $container->append($textElement);
        }
    }

    public function renderSprite($element) {
        $spriteCssClass = $this->getProperty('spriteCssClass');

        if ($spriteCssClass) {
            $sprite = new \Kendo\Html\Element('span');
            $sprite->attr('class', 'k-sprite ' . $spriteCssClass);
            $element->append($sprite);
        }
    }

    public function renderItems($element) {
        $items = $this->getProperty('items');

        if ($items) {
            $itemContainer = new \Kendo\Html\Element('ul');

            foreach ($items as $item) {
                $itemContainer->append($item->createElement());
            }

            $element->append($itemContainer);
        }
    }

    public function createElement() {
        $element = new \Kendo\Html\Element('li');

        if ($this->getProperty('expanded')) {
            $element->attr('data-expanded', 'true');
        }

        $this->renderSprite($element);
        $this->renderText($element);

        $this->renderItems($element);

        return $element;
    }

}

?>
