<?php

require_once __DIR__.'/../lib/Kendo/Autoload.php';

class WidgetTestDouble extends Kendo\UI\Widget {

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
