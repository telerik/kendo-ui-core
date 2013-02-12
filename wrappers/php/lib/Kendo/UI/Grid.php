<?php

namespace Kendo\UI;

class Grid extends \Kendo\UI\Widget {
    protected function name() {
        return 'Grid';
    }
//>> Properties

    /**
    * Indicates whether the grid will call read on the DataSource initially.
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
    * Enables column header menu
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
    * Indicates whether editing is enabled/disabled.
    * @param boolean|\Kendo\UI\GridEditable|array $value
    * @return \Kendo\UI\Grid
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * Indicates whether filtering is enabled/disabled.
    * @param boolean|\Kendo\UI\GridFilterable|array $value
    * @return \Kendo\UI\Grid
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * Indicates whether column reordering is enabled/disable.
    * @param boolean $value
    * @return \Kendo\UI\Grid
    */
    public function reorderable($value) {
        return $this->setProperty('reorderable', $value);
    }

    /**
    * Indicates whether column resizing is enabled/disable.
    * @param boolean $value
    * @return \Kendo\UI\Grid
    */
    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    /**
    * Indicates whether grouping is enabled/disabled.
    * @param boolean|\Kendo\UI\GridGroupable|array $value
    * @return \Kendo\UI\Grid
    */
    public function groupable($value) {
        return $this->setProperty('groupable', $value);
    }

    /**
    * Sets the height of the grid.
    * @param float|string $value
    * @return \Kendo\UI\Grid
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Indicates whether keyboard navigation is enabled/disabled.
    * @param boolean $value
    * @return \Kendo\UI\Grid
    */
    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    /**
    * Indicates whether paging is enabled/disabled.
    * @param boolean|\Kendo\UI\GridPageable|array $value
    * @return \Kendo\UI\Grid
    */
    public function pageable($value) {
        return $this->setProperty('pageable', $value);
    }

    /**
    * Enable/disable grid scrolling.
    * @param boolean|\Kendo\UI\GridScrollable|array $value
    * @return \Kendo\UI\Grid
    */
    public function scrollable($value) {
        return $this->setProperty('scrollable', $value);
    }

    /**
    * Indicates whether selection is enabled/disabled. Possible values:
    * @param string $value
    * @return \Kendo\UI\Grid
    */
    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    /**
    * Defines whether grid columns are sortable.
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
    * Raised when the user clicks the "cancel" button (in inline or popup editing mode) or closes the popup window (popup editing mode).
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
    * Fires when the grid selection has changed.
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
    * Fires when the user hides a column.
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
    * Fires when the user changes the order of a column.
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
    * Fires when the user resizes a column.
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
    * Fires when a column is shown.
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
    * Sets the dataBound event of the Grid.
    * Fires when the grid has received data from the data source.
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
    * Sets the dataBinding event of the Grid.
    * Fires when the grid is about to be rendered.
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
    * Sets the detailCollapse event of the Grid.
    * Fires when the grid detail row is collapsed.
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
    * Fires when the grid detail row is expanded.
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
    * Fires when the grid detail is initialized.
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
    * Fires when the grid enters edit mode.
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
