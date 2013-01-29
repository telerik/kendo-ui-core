<?php

namespace Kendo\UI;

class TreeView extends \Kendo\UI\Widget {
    protected function name() {
        return 'TreeView';
    }
//>> Properties

    /**
    * A collection of visual animations used when items are expanded or collapsed through user interaction.
Setting this option to false will disable all animations.
    * @param \Kendo\UI\TreeViewAnimation $value
    * @return \Kendo\UI\TreeView
    */
    public function animation(\Kendo\UI\TreeViewAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * If true or an object, renders checkboxes within each treeview item.
    * @param boolean|\Kendo\UI\TreeViewCheckboxes $value
    * @return \Kendo\UI\TreeView
    */
    public function checkboxes($value) {
        return $this->setProperty('checkboxes', $value);
    }

    /**
    * Sets the field of the data item that provides
the image URL of the treeview nodes.
    * @param string $value
    * @return \Kendo\UI\TreeView
    */
    public function dataImageUrlField($value) {
        return $this->setProperty('dataImageUrlField', $value);
    }

    /**
    * Sets the data source of the TreeView.
    * @param \Kendo\Data\HierarchyDataSource $value
    * @return \Kendo\UI\TreeView
    */
    public function dataSource(\Kendo\Data\HierarchyDataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the field of the data item that provides
the sprite CSS class of the treeview nodes.
    * @param string $value
    * @return \Kendo\UI\TreeView
    */
    public function dataSpriteCssClassField($value) {
        return $this->setProperty('dataSpriteCssClassField', $value);
    }

    /**
    * Sets the field of the data item that provides
the text content of the treeview nodes.
    * @param string $value
    * @return \Kendo\UI\TreeView
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides
the link URL of the treeview nodes.
    * @param string $value
    * @return \Kendo\UI\TreeView
    */
    public function dataUrlField($value) {
        return $this->setProperty('dataUrlField', $value);
    }

    /**
    * Disables (false) or enables (true) drag-and-drop on the nodes of a
TreeView.
    * @param boolean $value
    * @return \Kendo\UI\TreeView
    */
    public function dragAndDrop($value) {
        return $this->setProperty('dragAndDrop', $value);
    }

    /**
    * Indicates whether the child datasources should be fetched
lazily, when parent groups get expanded. Setting this to false causes all child dataSources to
be loaded at initialization time. Note: when initializing a TreeView from array (rather than from a
HierarchicalDataSource instance), the default value of this option is false.
    * @param boolean $value
    * @return \Kendo\UI\TreeView
    */
    public function loadOnDemand($value) {
        return $this->setProperty('loadOnDemand', $value);
    }

    /**
    * Template for rendering of the nodes of the treeview.
    * @param string|\kendo\JavaScriptFunction $value
    * @return \Kendo\UI\TreeView
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Adds TreeViewItem to the TreeView.
    * @param mixed|\Kendo\UI\TreeViewItem,... $value one or more TreeViewItem to add.
    * @return \Kendo\UI\TreeView
    */
    public function addItem($value) {
        return $this->add('items', func_get_args());
    }

    /**
    * Sets the collapse event of the TreeView.
    * Triggered before a subgroup gets collapsed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function collapse($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('collapse', $value);
    }

    /**
    * Sets the dataBound event of the TreeView.
    * Triggered after the dataSource change event has been processed (adding/removing items);
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the drag event of the TreeView.
    * Triggered while a node is being dragged.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function drag($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('drag', $value);
    }

    /**
    * Sets the dragend event of the TreeView.
    * Triggered after a node has been dropped.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function dragend($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragend', $value);
    }

    /**
    * Sets the dragstart event of the TreeView.
    * Triggered before the dragging of a node starts.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function dragstart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragstart', $value);
    }

    /**
    * Sets the drop event of the TreeView.
    * Triggered when a node is being dropped.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function drop($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('drop', $value);
    }

    /**
    * Sets the expand event of the TreeView.
    * Triggered before a subgroup gets expanded.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function expand($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('expand', $value);
    }

    /**
    * Sets the select event of the TreeView.
    * Triggered when a node gets selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the navigate event of the TreeView.
    * Triggered when the user moves the focus on another node
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function navigate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('navigate', $value);
    }

//<< Properties
}

?>
