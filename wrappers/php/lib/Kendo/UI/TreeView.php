<?php

namespace Kendo\UI;

class TreeView extends \Kendo\UI\Widget {
    protected $ignore = array('items');

    protected function name() {
        return 'TreeView';
    }

    protected function createElement() {
        $items = $this->getProperty('items');

        if ($items) {
            $element = new \Kendo\Html\Element('ul');
            foreach ($items as $item) {
                $element->append($item->createElement());
            }
        } else {
            $element = new \Kendo\Html\Element('div');
        }

        return $element;
    }

//>> Properties

    /**
    * A collection of visual animations used when items are expanded or collapsed through user interaction.
Setting this option to false will disable all animations.
    * @param boolean|\Kendo\UI\TreeViewAnimation|array $value
    * @return \Kendo\UI\TreeView
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\UI\TreeView
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * If true or an object, renders checkboxes beside each node.
    * @param boolean|\Kendo\UI\TreeViewCheckboxes|array $value
    * @return \Kendo\UI\TreeView
    */
    public function checkboxes($value) {
        return $this->setProperty('checkboxes', $value);
    }

    /**
    * Sets the field of the data item that provides the image URL of the treeview nodes.
    * @param string $value
    * @return \Kendo\UI\TreeView
    */
    public function dataImageUrlField($value) {
        return $this->setProperty('dataImageUrlField', $value);
    }

    /**
    * Sets the data source of the TreeView.
    * @param array|\Kendo\Data\HierarchicalDataSource $value
    * @return \Kendo\UI\TreeView
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the field of the data item that provides the sprite CSS class of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.
    * @param string $value
    * @return \Kendo\UI\TreeView
    */
    public function dataSpriteCssClassField($value) {
        return $this->setProperty('dataSpriteCssClassField', $value);
    }

    /**
    * Sets the field of the data item that provides the text content of the nodes.
If an array, each level uses the field that is at the same index in the array, or the last item in the array.
    * @param string|array $value
    * @return \Kendo\UI\TreeView
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides the link URL of the nodes.
    * @param string $value
    * @return \Kendo\UI\TreeView
    */
    public function dataUrlField($value) {
        return $this->setProperty('dataUrlField', $value);
    }

    /**
    * Disables (false) or enables (true) drag-and-drop of the nodes.
    * @param boolean $value
    * @return \Kendo\UI\TreeView
    */
    public function dragAndDrop($value) {
        return $this->setProperty('dragAndDrop', $value);
    }

    /**
    * Indicates whether the child datasources should be fetched lazily when parent groups get expanded.
Setting this to false causes all child dataSources to be loaded at initialization time.
Note: when initializing the widget from an array (rather than from a HierarchicalDataSource instance), this option defaults to false, rather than true.
    * @param boolean $value
    * @return \Kendo\UI\TreeView
    */
    public function loadOnDemand($value) {
        return $this->setProperty('loadOnDemand', $value);
    }

    /**
    * Sets the template option of the TreeView.
    * Template for rendering each node.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\TreeView
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the TreeView.
    * Template for rendering each node.
    * @param string $value The template content.
    * @return \Kendo\UI\TreeView
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Adds TreeViewItem to the TreeView.
    * @param \Kendo\UI\TreeViewItem|array,... $value one or more TreeViewItem to add.
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
    * Sets the change event of the TreeView.
    * Triggered when the selection has changed (either by the user or through the select method).
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeView
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the select event of the TreeView.
    * Triggered when a node is being selected by the user. Cancellable.
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
