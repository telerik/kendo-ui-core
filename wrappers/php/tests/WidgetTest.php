<?php

require_once 'PHPUnit/Autoload.php';
require_once 'WidgetTestDouble.php';

class WidgetTest extends PHPUnit_Framework_TestCase {

    private $widget;

    protected function setUp() {
        $this->widget = new WidgetTestDouble('foo');
    }

    public function testHtmlUsesIdAndTagName() {
        $this->assertEquals('<div id="foo"></div>', $this->widget->Html());
    }

    public function testScriptReturnsPluginInitializationStatement() {
        $this->widget->setFoo('foo');

        $this->assertEquals('jQuery(function(){jQuery("#foo").kendoFoo({"foo":"foo"});});', $this->widget->script());
    }

    public function testScriptDoesntIncludejQueryReadyIfCalledWithFalseAsArgument() {
        $this->widget->setFoo('foo');

        $this->assertEquals('jQuery("#foo").kendoFoo({"foo":"foo"});', $this->widget->script(false));
    }

    public function testRenderReturnsHtmlAndScript() {
        $this->assertEquals('<div id="foo"></div><script>jQuery(function(){jQuery("#foo").kendoFoo({});});</script>', $this->widget->render());
    }

    public function testAttrAppliesHtmlAttributes() {
        $this->widget->attr('title', 'bar');
        $this->assertEquals('<div id="foo" title="bar"></div>', $this->widget->Html());
    }
}

?>
