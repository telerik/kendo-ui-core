<?php

namespace Kendo\UI;

class TreeView extends \Kendo\UI\Widget {
    public function name() {
        return 'TreeView';
    }
//>> Properties

    public function animation(\Kendo\UI\TreeViewAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    public function checkboxes($value) {
        return $this->setProperty('checkboxes', $value);
    }

    public function dataImageUrlField($value) {
        return $this->setProperty('dataImageUrlField', $value);
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function dataSpriteCssClassField($value) {
        return $this->setProperty('dataSpriteCssClassField', $value);
    }

    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    public function dataUrlField($value) {
        return $this->setProperty('dataUrlField', $value);
    }

    public function dragAndDrop($value) {
        return $this->setProperty('dragAndDrop', $value);
    }

    public function loadOnDemand($value) {
        return $this->setProperty('loadOnDemand', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function addItem(\Kendo\UI\TreeViewItem $value) {
        return $this->add('items', $value);
    }

    public function collapse($value) {
        return $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));
    }

    public function dataBound($value) {
        return $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));
    }

    public function drag($value) {
        return $this->setProperty('drag', new \Kendo\JavaScriptFunction($value));
    }

    public function dragend($value) {
        return $this->setProperty('dragend', new \Kendo\JavaScriptFunction($value));
    }

    public function dragstart($value) {
        return $this->setProperty('dragstart', new \Kendo\JavaScriptFunction($value));
    }

    public function drop($value) {
        return $this->setProperty('drop', new \Kendo\JavaScriptFunction($value));
    }

    public function expand($value) {
        return $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

    public function navigate($value) {
        return $this->setProperty('navigate', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
