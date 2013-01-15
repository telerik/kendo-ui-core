<?php

require_once 'PHPUnit/Autoload.php';
require_once 'WidgetTestDouble.php';

class WidgetTest extends PHPUnit_Framework_TestCase {

    private $widget;

    protected function setUp() {
        $this->widget = new WidgetTestDouble('foo');
    }

    public function test_html_returns_tag_name() {
        $this->assertEquals('<div id="foo"></div>', $this->widget->html());
    }
}
