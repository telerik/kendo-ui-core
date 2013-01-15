<?php

namespace kendo\ui;

require_once 'html/Element.php';
require_once 'JsonObject.php';

abstract class Widget extends \kendo\JsonObject{
    private $id;

    function __construct($id) {
        $this->id = $id;
    }

    abstract function tagName();

    public function createElement() {
        $element = new \kendo\html\Element($this->tagName());

        $element->attr('id', $this->id);

        return $element;
    }

    public function html() {
        $element = $this->createElement();

        return $element->outerHtml();
    }
}

?>
