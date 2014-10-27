<?php

namespace Kendo\UI;

class TreeList extends \Kendo\UI\Widget {
    public function name() {
        return 'TreeList';
    }
//>> Properties

    /**
    * Adds TreeListColumn to the TreeList.
    * @param \Kendo\UI\TreeListColumn|array,... $value one or more TreeListColumn to add.
    * @return \Kendo\UI\TreeList
    */
    public function addColumn($value) {
        return $this->add('columns', func_get_args());
    }

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\UI\TreeList
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * If set to true the grid will display a scrollbar when the total row height (or width) exceeds the grid height (or width). By default scrolling is enabled.Can be set to a JavaScript object which represents the scrolling configuration.
    * @param boolean| $value
    * @return \Kendo\UI\TreeList
    */
    public function scrollable($value) {
        return $this->setProperty('scrollable', $value);
    }

    /**
    * If set to true the user would be able to select treelist rows. By default selection is disabled.Can also be set to the following string values:
    * @param boolean|string $value
    * @return \Kendo\UI\TreeList
    */
    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    /**
    * If set to true the user could sort the treelist by clicking the column header cells. By default sorting is disabled.Can be set to a JavaScript object which represents the sorting configuration.
    * @param boolean|\Kendo\UI\TreeListSortable|array $value
    * @return \Kendo\UI\TreeList
    */
    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    /**
    * Adds TreeListToolbarItem to the TreeList.
    * @param \Kendo\UI\TreeListToolbarItem|array,... $value one or more TreeListToolbarItem to add.
    * @return \Kendo\UI\TreeList
    */
    public function addToolbarItem($value) {
        return $this->add('toolbar', func_get_args());
    }

    /**
    * The height of the treelist. Numeric values are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\TreeList
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * If set to true the user can filter the data source using the grid filter menu. Filtering is disabled by default.Can be set to a JavaScript object which represents the filter menu configuration.
    * @param boolean|\Kendo\UI\TreeListFilterable|array $value
    * @return \Kendo\UI\TreeList
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * If set to true the user would be able to edit the data to which the treelist is bound to. By default editing is disabled.Can be set to a string ("inline" or "popup") to specify the editing mode. The default editing mode is "inline".Can be set to a JavaScript object which represents the editing configuration.
    * @param boolean|\Kendo\UI\TreeListEditable|array $value
    * @return \Kendo\UI\TreeList
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * Sets the data source of the TreeList.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\TreeList
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the dataBinding event of the TreeList.
    * Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function dataBinding($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBinding', $value);
    }

    /**
    * Sets the dataBound event of the TreeList.
    * Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the remove event of the TreeList.
    * Fired when the user clicks the "destroy" command button.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function remove($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('remove', $value);
    }

    /**
    * Sets the edit event of the TreeList.
    * Fired when the user edits or creates a data item.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function edit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('edit', $value);
    }

    /**
    * Sets the save event of the TreeList.
    * Fired when a data item is saved.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function save($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('save', $value);
    }

    /**
    * Sets the cancel event of the TreeList.
    * Fired when the user clicks the "cancel" button (in inline or popup editing mode) or closes the popup window.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function cancel($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('cancel', $value);
    }

    /**
    * Sets the change event of the TreeList.
    * Fired when the user selects a table row or cell in the treelist.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the filterMenuInit event of the TreeList.
    * Fired when the treelist filter menu is initialized.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeList
    */
    public function filterMenuInit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('filterMenuInit', $value);
    }


//<< Properties
}

?>
