<?php

namespace Kendo\UI;

class Grid extends \Kendo\UI\Widget {
    protected function name() {
        return 'Grid';
    }
//>> Properties

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired.By default this option is set to true which means that the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\UI\Grid
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Adds GridColumn to the Grid.
    * @param \Kendo\UI\GridColumn|array,... $value one or more GridColumn to add.
    * @return \Kendo\UI\Grid
    */
    public function addColumn($value) {
        return $this->add('columns', func_get_args());
    }

    /**
    * If set to true the grid will display the column menu when the user clicks the chevron icon in the column headers. The column menu allows the user to show and hide columns, filter and sort (if filtering and sorting are enabled).
By default the column menu is not enabled.Can be set to a JavaScript object which represents the column menu configuration.
    * @param boolean|\Kendo\UI\GridColumnMenu|array $value
    * @return \Kendo\UI\Grid
    */
    public function columnMenu($value) {
        return $this->setProperty('columnMenu', $value);
    }

    /**
    * Sets the data source of the Grid.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\Grid
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * If set to true the user would be able to edit the data to which the grid is bound to. By default editing is disabled.Can be set to a string ("inline", "incell" or "popup") to specify the editing mode. The default editing mode is "incell".Can be set to a JavaScript object which represents the editing configuration.
    * @param boolean|\Kendo\UI\GridEditable|array $value
    * @return \Kendo\UI\Grid
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * If set to true the user can filter the data source using the grid filter menu. Filtering is disabled by default.Can be set to a JavaScript object which represents the filter menu configuration.
    * @param boolean|\Kendo\UI\GridFilterable|array $value
    * @return \Kendo\UI\Grid
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * If set to true the user could group the grid by dragging the column header cells. By default grouping is disabled.Can be set to a JavaScript object which represents the grouping configuration.
    * @param boolean|\Kendo\UI\GridGroupable|array $value
    * @return \Kendo\UI\Grid
    */
    public function groupable($value) {
        return $this->setProperty('groupable', $value);
    }

    /**
    * The height of the grid. Numeric values are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\Grid
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * If set to true the use could navigate the widget using the keyboard navigation. By default keyboard navigation is disabled.
    * @param boolean $value
    * @return \Kendo\UI\Grid
    */
    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    /**
    * If set to true the grid will display a pager. By default paging is disabled.Can be set to a JavaScript object which represents the pager configuration.
    * @param boolean|\Kendo\UI\GridPageable|array $value
    * @return \Kendo\UI\Grid
    */
    public function pageable($value) {
        return $this->setProperty('pageable', $value);
    }

    /**
    * If set to true the user could reorder the columns by dragging their header cells. By default reordering is disabled.
    * @param boolean $value
    * @return \Kendo\UI\Grid
    */
    public function reorderable($value) {
        return $this->setProperty('reorderable', $value);
    }

    /**
    * If set to true the user could resize the columns by dragging the edges of their header cells. By default resizing is disabled.
    * @param boolean $value
    * @return \Kendo\UI\Grid
    */
    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    /**
    * If set to true the grid will display a scrollbar when the total row height (or width) exceeds the grid height (or width). By default scrolling is enabled.Can be set to a JavaScript object which represents the scrolling configuration.
    * @param boolean|\Kendo\UI\GridScrollable|array $value
    * @return \Kendo\UI\Grid
    */
    public function scrollable($value) {
        return $this->setProperty('scrollable', $value);
    }

    /**
    * If set to true the user would be able to select grid rows. By default selection is disabled.Can also be set to the following string values:
    * @param boolean|string $value
    * @return \Kendo\UI\Grid
    */
    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    /**
    * If set to true the user could sort the grid by clicking the column header cells. By default sorting is disabled.Can be set to a JavaScript object which represents the sorting configuration.
    * @param boolean|\Kendo\UI\GridSortable|array $value
    * @return \Kendo\UI\Grid
    */
    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    /**
    * Adds GridToolbarItem to the Grid.
    * @param \Kendo\UI\GridToolbarItem|array,... $value one or more GridToolbarItem to add.
    * @return \Kendo\UI\Grid
    */
    public function addToolbarItem($value) {
        return $this->add('toolbar', func_get_args());
    }

    /**
    * Sets the detailTemplate option of the Grid.
    * The id of the template used for rendering the detail rows in the grid.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Grid
    */
    public function detailTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('detailTemplate', $value);
    }

    /**
    * Sets the detailTemplate option of the Grid.
    * The id of the template used for rendering the detail rows in the grid.
    * @param string $value The template content.
    * @return \Kendo\UI\Grid
    */
    public function detailTemplate($value) {
        return $this->setProperty('detailTemplate', $value);
    }

    /**
    * Sets the rowTemplate option of the Grid.
    * The id of the template used for rendering the rows in the grid.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Grid
    */
    public function rowTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('rowTemplate', $value);
    }

    /**
    * Sets the rowTemplate option of the Grid.
    * The id of the template used for rendering the rows in the grid.
    * @param string $value The template content.
    * @return \Kendo\UI\Grid
    */
    public function rowTemplate($value) {
        return $this->setProperty('rowTemplate', $value);
    }

    /**
    * Sets the altRowTemplate option of the Grid.
    * The id of the template used for rendering the alternate rows in the grid.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Grid
    */
    public function altRowTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('altRowTemplate', $value);
    }

    /**
    * Sets the altRowTemplate option of the Grid.
    * The id of the template used for rendering the alternate rows in the grid.
    * @param string $value The template content.
    * @return \Kendo\UI\Grid
    */
    public function altRowTemplate($value) {
        return $this->setProperty('altRowTemplate', $value);
    }

    /**
    * Sets the cancel event of the Grid.
    * Fired when the user clicks the "cancel" button (in inline or popup editing mode) or closes the popup window.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function cancel($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('cancel', $value);
    }

    /**
    * Sets the change event of the Grid.
    * Fired when the user selects a table row or cell in the grid.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the columnHide event of the Grid.
    * Fired when the user hides a column.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function columnHide($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('columnHide', $value);
    }

    /**
    * Sets the columnReorder event of the Grid.
    * Fired when the user changes the order of a column.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function columnReorder($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('columnReorder', $value);
    }

    /**
    * Sets the columnResize event of the Grid.
    * Fired when the user resizes a column.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function columnResize($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('columnResize', $value);
    }

    /**
    * Sets the columnShow event of the Grid.
    * Fired when the user shows a column.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function columnShow($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('columnShow', $value);
    }

    /**
    * Sets the dataBinding event of the Grid.
    * Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function dataBinding($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBinding', $value);
    }

    /**
    * Sets the dataBound event of the Grid.
    * Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the detailCollapse event of the Grid.
    * Fired when the user collapses a detail table row.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function detailCollapse($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('detailCollapse', $value);
    }

    /**
    * Sets the detailExpand event of the Grid.
    * Fired when the user expands a detail table row.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function detailExpand($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('detailExpand', $value);
    }

    /**
    * Sets the detailInit event of the Grid.
    * Fired when a detail table row is initialized.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function detailInit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('detailInit', $value);
    }

    /**
    * Sets the edit event of the Grid.
    * Fired when the user edits or creates a data item.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function edit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('edit', $value);
    }

    /**
    * Sets the filterMenuInit event of the Grid.
    * Fires when the grid column filter menu is initialized.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function filterMenuInit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('filterMenuInit', $value);
    }

    /**
    * Sets the columnMenuInit event of the Grid.
    * Fires when the grid column menu is initialized.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function columnMenuInit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('columnMenuInit', $value);
    }

    /**
    * Sets the remove event of the Grid.
    * Fires before the grid item is removed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function remove($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('remove', $value);
    }

    /**
    * Sets the save event of the Grid.
    * Fires before the grid item is changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function save($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('save', $value);
    }

    /**
    * Sets the saveChanges event of the Grid.
    * Fires before the grid calls DataSource sync.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Grid
    */
    public function saveChanges($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('saveChanges', $value);
    }


//<< Properties

    /**
    * Sets the toolbar option of the Grid.
    * The id of the template used for rendering the toolbar in the grid.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Grid
    */
    public function toolbarTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('toolbar', $value);
    }
}

?>
