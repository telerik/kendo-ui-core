<?php

require_once __DIR__.'/../lib/Kendo/Autoload.php';
require_once 'PHPUnit/Autoload.php';
require_once 'SerializableObjectTestDouble.php';

class JsonObjectTest extends PHPUnit_Framework_TestCase {

    private $jsonObject;

    protected function setUp() {
        $this->jsonObject = new SerializableObjectTestDouble();
    }

    public function testToJSONSerializesAllProperties() {
        $this->jsonObject->setFoo('foo');

        $this->assertEquals('{"foo":"foo"}', $this->jsonObject->toJSON());
    }

    public function testToJSONSerializesOnlySetProperties() {
        $this->assertEquals('{}', $this->jsonObject->toJSON());
    }


    public function testToJSONSerializesNestedJsonObjects() {
        $foo = new SerializableObjectTestDouble();
        $foo->setFoo('foo');

        $this->jsonObject->setFoo($foo);

        $this->assertEquals('{"foo":{"foo":"foo"}}', $this->jsonObject->toJSON());
    }

    public function testAddCreatesArrays() {
        $this->jsonObject->addFoo('foo');

        $this->assertEquals('{"foo":["foo"]}', $this->jsonObject->toJSON());
    }

    public function testAddAcceptsVariableNumberOfArguments() {
        $this->jsonObject->addFoo('foo', 'bar');

        $this->assertEquals('{"foo":["foo","bar"]}', $this->jsonObject->toJSON());
    }

    public function testToJSONSIgnoredProperties() {
        $this->jsonObject->setBar('bar');

        $this->assertEquals('{}', $this->jsonObject->toJSON());
    }

}
