<?php

namespace kendo\ui;

require_once 'JsonObject.php';

abstract class Widget extends \kendo\JsonObject{
    private $id;

    function __construct($id) {
        $this->id = $id;
    }

    abstract function tagName();

    public function html() {
        $html = array();

        $html[] = '<';
        $html[] = $this->tagName();
        $html[] = ' id="';
        $html[] = $this->id;
        $html[] = '"></';
        $html[] = $this->tagName();
        $html[] = '>';

        return implode($html);
    }
}

?>
