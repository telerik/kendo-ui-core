<?php

require_once 'PHPUnit/Autoload.php';
require_once 'WidgetTestDouble.php';

class JsonObjectTests extends PHPUnit_Framework_TestCase {
    private $widget;

    protected function setUp() {
        $this->widget = new WidgetTestDouble();
    }

    public function test_toJSON_returns_properties_as_json() {
        $this->widget->setFoo("foo");

        $this->assertEquals('{"foo":"foo"}', $this->widget->toJSON());
    }

    public function test_toJSON_returns_only_set_properties() {
        $this->assertEquals('{}', $this->widget->toJSON());
    }
}
