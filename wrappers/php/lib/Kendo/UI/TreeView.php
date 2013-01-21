<?php

namespace Kendo\UI;

class TreeView extends \Kendo\UI\Widget {
    public function name() {
        return 'TreeView';
    }
//>> Properties

    public function animation(\Kendo\UI\TreeViewAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function checkboxes($value) {
        $this->setProperty('checkboxes', $value);

        return $this;
    }

    public function checkboxes(\Kendo\UI\TreeViewCheckboxes $value) {
        $this->setProperty('checkboxes', $value);

        return $this;
    }

    public function dataImageUrlField($value) {
        $this->setProperty('dataImageUrlField', $value);

        return $this;
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function dataSpriteCssClassField($value) {
        $this->setProperty('dataSpriteCssClassField', $value);

        return $this;
    }

    public function dataTextField($value) {
        $this->setProperty('dataTextField', $value);

        return $this;
    }

    public function dataUrlField($value) {
        $this->setProperty('dataUrlField', $value);

        return $this;
    }

    public function dragAndDrop($value) {
        $this->setProperty('dragAndDrop', $value);

        return $this;
    }

    public function loadOnDemand($value) {
        $this->setProperty('loadOnDemand', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function addItem(\Kendo\UI\TreeViewItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function collapse($value) {
        $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function drag($value) {
        $this->setProperty('drag', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dragend($value) {
        $this->setProperty('dragend', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dragstart($value) {
        $this->setProperty('dragstart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function drop($value) {
        $this->setProperty('drop', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function expand($value) {
        $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function navigate($value) {
        $this->setProperty('navigate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
