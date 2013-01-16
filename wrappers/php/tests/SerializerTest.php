<?php

require_once 'PHPUnit/Autoload.php';
require_once 'lib/kendo/Autoload.php';
require_once 'JsonObjectTestDouble.php';

class SerializerTest extends PHPUnit_Framework_TestCase {
    private $serializer;

    public function setUp() {
        $this->serializer = new kendo\Serializer();
    }

    public function testJsonReturnsSerializedObject() {
        $this->assertEquals('{}', $this->serializer->serialize(array()));
    }

    public function testJsonSerializesKeyValuePairForGetter() {
        $this->assertEquals('{"foo":1}', $this->serializer->serialize(array(
            'foo' => 1
        )));
    }

    public function testJsonSerializesCommaSeparatedKeyValuePairsForTheGetters() {
        $this->assertEquals('{"foo":1,"bar":2}', $this->serializer->serialize(array(
            'foo' => 1,
            'bar' => 2
        )));
    }

    public function testJsonQuotesStrings() {
        $this->assertEquals('{"foo":"foo"}', $this->serializer->serialize(array(
            'foo' => 'foo'
        )));
    }

    public function testJsonEscapesQuotes() {
        $this->assertEquals('{"foo":"\\""}', $this->serializer->serialize(array(
            'foo' => '"'
        )));
    }

    public function testJsonEscapesBackSlash() {
        $this->assertEquals('{"foo":"\\\\"}', $this->serializer->serialize(array(
            'foo' => '\\'
        )));
    }

    public function testJsonEscapesCarriageReturn() {
        $this->assertEquals('{"foo":"\\r"}', $this->serializer->serialize(array(
            'foo' => "\r"
        )));
    }

    public function testJsonEscapesLineFeed() {
        $this->assertEquals('{"foo":"\\n"}', $this->serializer->serialize(array(
            'foo' => "\n"
        )));
    }

    public function testJsonEscapesTab() {
        $this->assertEquals('{"foo":"\\t"}', $this->serializer->serialize(array(
            'foo' => "\t"
        )));
    }

    public function testJsonEscapesFormFeed() {
        $this->assertEquals('{"foo":"\\f"}', $this->serializer->serialize(array(
            'foo' => "\f"
        )));
    }

    public function testJsonEscapesSlashWhenAfterLessThan() {
        $this->assertEquals('{"foo":"<\\/script>"}', $this->serializer->serialize(array(
            'foo' => '</script>'
        )));
    }

    public function testJsonSerializesNumbers() {
        $this->assertEquals('{"foo":1.5}', $this->serializer->serialize(array(
            'foo' => 1.5
        )));
    }

    public function testJsonSerializesBooleans() {
        $this->assertEquals('{"foo":true}', $this->serializer->serialize(array(
            'foo' => true
        )));
    }

    public function testJsonSerializesNestedObjects() {
        $this->assertEquals('{"foo":{"bar":"bar"}}', $this->serializer->serialize(array(
            'foo' => array('bar' => 'bar')
        )));
    }

    public function testJsonSerializesArrays() {
        $this->assertEquals('{"foo":[1,2]}', $this->serializer->serialize(array(
            'foo' => array(1, 2)
        )));
    }

    public function testJsonsSerializesDates() {
        $this->assertEquals('{"date":new Date(949090942000)}', $this->serializer->serialize(array(
            'date' => DateTime::createFromFormat('Y-m-d\TH:i:s', '2000-01-28T20:22:22', new DateTimeZone('UTC'))
        )));
    }

    public function testJsonSerializesMaps() {
        $this->assertEquals('{"foo":{"bar":"bar","baz":"baz"}}', $this->serializer->serialize(array(
            'foo' => array('bar' => 'bar', 'baz' => 'baz')
        )));
    }

    public function testJsonSerializesSerializablesUsingTheirProperties() {
        $value = new JsonObjectTestDouble();

        $value->setFoo('foo');

        $this->assertEquals('{"foo":"foo"}', $this->serializer->serialize($value));
    }

    public function testJsonSerializesNestedSerializables() {
        $value = new JsonObjectTestDouble();

        $nested = new JsonObjectTestDouble();

        $nested->setFoo('bar');

        $value->setFoo($nested);

        $this->assertEquals('{"foo":{"foo":"bar"}}', $this->serializer->serialize($value));
    }

    public function testJsonSerializesFunctionsAsVerbatimValue() {
        $this->assertEquals('{"foo":foo}', $this->serializer->serialize(array(
            'foo' => new kendo\JavaScriptFunction('foo')
        )));
    }
}
