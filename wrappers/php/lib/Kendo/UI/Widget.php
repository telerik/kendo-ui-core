<?php

namespace Kendo\UI;

abstract class Widget extends \Kendo\SerializableObject{

    protected $id;

    private $attributes = array();
    private $isClientTemplate = false;

    function __construct($id) {
        $this->id = $id;
    }

    public function attr($key, $value) {
        $this->attributes[$key] = $value;

        return $this;
    }

    protected function createElement() {
        return new \Kendo\Html\Element('div');
    }

    protected function addAttributes(\Kendo\Html\Element $element) {
        $element->attr('id', $this->id);

        if ($element->tagName() == 'textarea' || $element->tagName() == 'input' || $element->tagName() == 'select') {
            $element->attr('name', $this->id);
        }

        foreach ($this->attributes as $key => $value) {
            $element->attr($key, $value);
        }
    }

    public function html() {
        $element = $this->createElement();

        $this->addAttributes($element);

        return $element->outerHtml();
    }

    protected abstract function name();

    public function render() {
        $output = array();

        $output[] = $this->html();
        $output[] = '<script>';
        $output[] = $this->script();
        $output[] = '</script>';

        return implode($output);
    }

    public function renderInTemplate() {
        $this->isClientTemplate = true;

        $output = $this->render();

        $this->isClientTemplate = false;

        return str_replace('</script>', '<\\/script>', $output);
    }

    private function escapeSelector($value) {
        return preg_replace('/([\[\]])/', "\\\\\\\\\\1", $value);
    }

    public function script($executeOnDomReady = true) {
        $script = array();

        if ($executeOnDomReady) {
            $script[] = 'jQuery(function(){';
        }

        $prefix = $this->isClientTemplate ? '\#' : '#';

        $script[] = 'jQuery("'.$prefix;
        $script[] = $this->escapeSelector($this->id);
        $script[] = '").kendo';
        $script[] = $this->name();
        $script[] = '(';
        $script[] = $this->toJSON();
        $script[] = ');';

        if ($executeOnDomReady) {
            $script[] = '});';
        }

        return implode($script);
    }

}

?>
