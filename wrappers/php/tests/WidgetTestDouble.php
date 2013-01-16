<?php

require_once 'lib/kendo/Autoload.php';

class WidgetTestDouble extends kendo\ui\Widget {

    public function tagName() {
        return 'div';
    }

    public function name() {
        return 'Foo';
    }

    public function setFoo($value) {
        $this->setProperty('foo', $value);
    }
}

?>
