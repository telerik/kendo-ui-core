<?php

require_once 'lib/kendo/Widget.php';

class WidgetTestDouble extends kendo\ui\Widget {

    public function tagName() {
        return 'div';
    }
}

?>
