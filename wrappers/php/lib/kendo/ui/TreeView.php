<?php

namespace kendo\ui;

class TreeView extends \kendo\ui\Widget {
    public function name() {
        return 'TreeView';
    }
//>> Properties

    public function setAnimation(\kendo\ui\TreeViewAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setCheckboxes($value) {
        $this->setProperty('checkboxes', $value);

        return $this;
    }

    public function setCheckboxes(\kendo\ui\TreeViewCheckboxes $value) {
        $this->setProperty('checkboxes', $value);

        return $this;
    }

    public function setDataImageUrlField($value) {
        $this->setProperty('dataImageUrlField', $value);

        return $this;
    }

    public function setDataSource(\kendo\data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setDataSpriteCssClassField($value) {
        $this->setProperty('dataSpriteCssClassField', $value);

        return $this;
    }

    public function setDataTextField($value) {
        $this->setProperty('dataTextField', $value);

        return $this;
    }

    public function setDataUrlField($value) {
        $this->setProperty('dataUrlField', $value);

        return $this;
    }

    public function setDragAndDrop($value) {
        $this->setProperty('dragAndDrop', $value);

        return $this;
    }

    public function setLoadOnDemand($value) {
        $this->setProperty('loadOnDemand', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function addItem(\kendo\ui\TreeViewItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setCollapse($value) {
        $this->setProperty('collapse', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDrag($value) {
        $this->setProperty('drag', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragend($value) {
        $this->setProperty('dragend', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragstart($value) {
        $this->setProperty('dragstart', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDrop($value) {
        $this->setProperty('drop', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setExpand($value) {
        $this->setProperty('expand', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setNavigate($value) {
        $this->setProperty('navigate', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
