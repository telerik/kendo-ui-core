<?php

require_once 'PHPUnit/Autoload.php';
require_once 'JsonObjectTestDouble.php';

class JsonObjectTest extends PHPUnit_Framework_TestCase {

    private $jsonObject;

    protected function setUp() {
        $this->jsonObject = new JsonObjectTestDouble();
    }

    public function testToJSONSerializesAllProperties() {
        $this->jsonObject->setFoo('foo');

        $this->assertEquals('{"foo":"foo"}', $this->jsonObject->toJSON());
    }

    public function testToJSONSerializesOnlySetProperties() {
        $this->assertEquals('{}', $this->jsonObject->toJSON());
    }

    public function testToJSONSerializesNestedJsonObjects() {
        $foo = new JsonObjectTestDouble();
        $foo->setFoo('foo');

        $this->jsonObject->setFoo($foo);

        $this->assertEquals('{"foo":{"foo":"foo"}}', $this->jsonObject->toJSON());
    }

}
