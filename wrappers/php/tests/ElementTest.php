<?php

require_once 'PHPUnit/Autoload.php';
require_once 'lib/kendo/html/Element.php';

class ElementTest extends PHPUnit_Framework_TestCase {

    private $element;

    protected function setUp() {
        $this->element = new \kendo\html\Element('div');
    }

    public function testOuterHtmlReturnsTheHtmlContentsOfTheElement() {
        $this->assertEquals('<div></div>', $this->element->outerHtml());
    }

    public function testSelfClosingElementsDoNotEmitClosingTag() {
        $element = new kendo\html\Element("img", true);

        $this->assertEquals("<img />", $element->outerHtml());
    }
}
?>
