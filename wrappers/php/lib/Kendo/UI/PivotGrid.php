<?php

namespace Kendo\UI;

class PivotGrid extends \Kendo\UI\Widget {
    public function name() {
        return 'PivotGrid';
    }
//>> Properties

    /**
    * Sets the data source of the PivotGrid.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\PivotGrid
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\UI\PivotGrid
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * If set to false the user will not be able to add/close/reorder current fields for columns/rows/measures.
    * @param boolean $value
    * @return \Kendo\UI\PivotGrid
    */
    public function reorderable($value) {
        return $this->setProperty('reorderable', $value);
    }

    /**
    * The width of the table columns. Value is treated as pixels.
    * @param float $value
    * @return \Kendo\UI\PivotGrid
    */
    public function columnWidth($value) {
        return $this->setProperty('columnWidth', $value);
    }

    /**
    * The height of the pivotgrid. Numeric values are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\PivotGrid
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The text messages displayed in the fields sections.
    * @param \Kendo\UI\PivotGridMessages|array $value
    * @return \Kendo\UI\PivotGrid
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * Sets the dataBinding event of the PivotGrid.
    * Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\PivotGrid
    */
    public function dataBinding($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBinding', $value);
    }

    /**
    * Sets the dataBound event of the PivotGrid.
    * Fired after the widget is bound to the data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\PivotGrid
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the expandMember event of the PivotGrid.
    * Fired before column or row field is expaneded.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\PivotGrid
    */
    public function expandMember($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('expandMember', $value);
    }

    /**
    * Sets the collapseMember event of the PivotGrid.
    * Fired before column or row field is collapsed.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\PivotGrid
    */
    public function collapseMember($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('collapseMember', $value);
    }


//<< Properties
}

?>
