<?php

namespace Kendo\UI;

class PanelBar extends \Kendo\UI\Widget {
    protected $ignore = array('items');

    public function name() {
        return 'PanelBar';
    }

    protected function createElement() {
        $element = new \Kendo\Html\Element('ul');
        $items = $this->getProperty('items');

        if ($items) {
            foreach($items as $item) {
                $element->append($item->createElement());
            }
        }

        return $element;
    }

//>> Properties

    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    public function expandMode($value) {
        return $this->setProperty('expandMode', $value);
    }

    public function addItem(\Kendo\UI\PanelBarItem $value) {
        return $this->add('items', $value);
    }

    public function activate($value) {
        return $this->setProperty('activate', new \Kendo\JavaScriptFunction($value));
    }

    public function collapse($value) {
        return $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));
    }

    public function contentLoad($value) {
        return $this->setProperty('contentLoad', new \Kendo\JavaScriptFunction($value));
    }

    public function error($value) {
        return $this->setProperty('error', new \Kendo\JavaScriptFunction($value));
    }

    public function expand($value) {
        return $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
