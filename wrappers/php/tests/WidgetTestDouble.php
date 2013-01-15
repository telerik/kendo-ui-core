<?php

require_once 'lib/kendo/Widget.php';

class WidgetTestDouble extends kendo\ui\Widget {
    private $foo;

    public function setFoo($foo) {
        $this->setProperty('foo', $foo);
    }
}
?>
