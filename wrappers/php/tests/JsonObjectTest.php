<?php

require_once 'PHPUnit/Autoload.php';
require_once 'JsonObjectTestDouble.php';

class JsonObjectTest extends PHPUnit_Framework_TestCase {

    private $jsonObject;

    protected function setUp() {
        $this->jsonObject = new JsonObjectTestDouble();
    }

    public function test_toJSON_returns_properties_as_json() {
        $this->jsonObject->setFoo("foo");

        $this->assertEquals('{"foo":"foo"}', $this->jsonObject->toJSON());
    }

    public function test_toJSON_returns_only_set_properties() {
        $this->assertEquals('{}', $this->jsonObject->toJSON());
    }

    public function test_toJSON_and_nested_json_objects() {
        $foo = new JsonObjectTestDouble();
        $foo->setFoo("foo");

        $this->jsonObject->setFoo($foo);

        $this->assertEquals('{"foo":{"foo":"foo"}}', $this->jsonObject->toJSON());
    }

}
