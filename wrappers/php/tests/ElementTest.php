<?php

reqUIre_once __DIR__.'/../lib/Kendo/Autoload.php';
reqUIre_once 'PHPUnit/Autoload.php';

class ElementTest extends PHPUnit_Framework_TestCase {

    private $element;

    protected function setUp() {
        $this->element = new \Kendo\Html\Element('div');
    }

    public function testOuterHtmlReturnsTheHtmlContentsOfTheElement() {
        $this->assertEquals('<div></div>', $this->element->outerHtml());
    }

    public function testSelfClosingElementsDoNotEmitClosingTag() {
        $element = new Kendo\Html\Element('img', true);

        $this->assertEquals('<img />', $element->outerHtml());
    }

    public function testAppendReturnsSelf() {
        $this->assertEquals($this->element, $this->element->append(new Kendo\Html\Element('span')));
    }

    public function testOuterHtmlIncludesTheChildren() {
        $child = new Kendo\Html\Element('span');

        $this->element->append($child);

        $this->assertEquals('<div><span></span></div>', $this->element->outerHtml());
    }

    public function testTextSetsTheTextContentOfTheElement() {
        $this->element->text('foo');

        $this->assertEquals('<div>foo</div>', $this->element->outerHtml());
    }

    public function testTextReturnsSelf() {
        $this->assertEquals($this->element, $this->element->text('foo'));
    }

    public function testTextOverridesChildren(){
        $this->element->append(new Kendo\Html\Element('span'));

        $this->element->text('foo');

        $this->assertEquals('<div>foo</div>', $this->element->outerHtml());
    }

    public function testTextEncodesEntities() {
        $this->element->text('<a>&');

        $this->assertEquals('<div>&lt;a&gt;&amp;</div>', $this->element->outerHtml());
    }

    public function testHtmlSetsTheHtmlContentOfTheElement() {
        $this->element->Html('<span>foo</span>');

        $this->assertEquals('<div><span>foo</span></div>', $this->element->outerHtml());
    }

    public function testHtmlReturnsSelf() {
        $this->assertEquals($this->element, $this->element->Html('foo'));
    }

    public function testHtmlOverridesChildren(){
        $this->element->append(new Kendo\Html\Element('span'));

        $this->element->Html('foo');

        $this->assertEquals('<div>foo</div>', $this->element->outerHtml());
    }

    public function testAttrOutputsAttribute() {
        $this->element->attr('title', 'foo');

        $this->assertEquals('<div title="foo"></div>', $this->element->outerHtml());
    }

    public function testAttrReturnsSelf() {
        $this->assertEquals($this->element, $this->element->attr("foo", "bar"));
    }
}
