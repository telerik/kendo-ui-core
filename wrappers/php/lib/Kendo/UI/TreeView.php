<?php

namespace Kendo\UI;

class TreeView extends \Kendo\UI\Widget {
    public function name() {
        return 'TreeView';
    }
//>> Properties

    public function setAnimation(\Kendo\UI\TreeViewAnimation $value) {
        $this->setProperty('animation', $value);

        return $this;
    }

    public function setCheckboxes($value) {
        $this->setProperty('checkboxes', $value);

        return $this;
    }

    public function setCheckboxes(\Kendo\UI\TreeViewCheckboxes $value) {
        $this->setProperty('checkboxes', $value);

        return $this;
    }

    public function setDataImageUrlField($value) {
        $this->setProperty('dataImageUrlField', $value);

        return $this;
    }

    public function setDataSource(\Kendo\Data\DataSource $value) {
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

    public function addItem(\Kendo\UI\TreeViewItem $value) {
        $values = $this->getProperty('items');

        if ($values == null) {
            $values = array();
            $this->setProperty('items', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setCollapse($value) {
        $this->setProperty('collapse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDrag($value) {
        $this->setProperty('drag', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragend($value) {
        $this->setProperty('dragend', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragstart($value) {
        $this->setProperty('dragstart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDrop($value) {
        $this->setProperty('drop', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setExpand($value) {
        $this->setProperty('expand', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setNavigate($value) {
        $this->setProperty('navigate', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
