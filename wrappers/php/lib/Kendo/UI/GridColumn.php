<?php

namespace Kendo\UI;

class GridColumn extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The aggregate(s) which are calculated when the grid is grouped by the columns field.
The supported aggregates are "average", "count", "max", "min" and "sum".
    * @param array $value
    * @return \Kendo\UI\GridColumn
    */
    public function aggregates($value) {
        return $this->setProperty('aggregates', $value);
    }

    /**
    * HTML attributes of the table cell (<td>) rendered for the column.
    * @param  $value
    * @return \Kendo\UI\GridColumn
    */
    public function attributes($value) {
        return $this->setProperty('attributes', $value);
    }

    /**
    * Adds GridColumnCommandItem to the GridColumn.
    * @param \Kendo\UI\GridColumnCommandItem|array,... $value one or more GridColumnCommandItem to add.
    * @return \Kendo\UI\GridColumn
    */
    public function addCommandItem($value) {
        return $this->add('command', func_get_args());
    }

    /**
    * Sets the editor option of the GridColumn.
    * Provides a way to specify a custom editing UI for the column. Use the container parameter to create the editing UI.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\GridColumn
    */
    public function editor($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('editor', $value);
    }

    /**
    * If set to true the column value will be HTML-encoded before it is displayed. If set to false the column value will be displayed as is. By default the column value is HTML-encoded.
    * @param boolean $value
    * @return \Kendo\UI\GridColumn
    */
    public function encoded($value) {
        return $this->setProperty('encoded', $value);
    }

    /**
    * The field to which the column is bound. The value of this field is displayed by the column during data binding.
The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.
    * @param string $value
    * @return \Kendo\UI\GridColumn
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * If set to true a filter menu will be displayed for this column when filtering is enabled. If set to false the filter menu will not be displayed. By default a filter menu is displayed
for all columns when filtering is enabled via the filterable option.Can be set to a JavaScript object which represents the filter menu configuration.
    * @param boolean|\Kendo\UI\GridColumnFilterable|array $value
    * @return \Kendo\UI\GridColumn
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * Sets the footerTemplate option of the GridColumn.
    * The template which renders the footer table cell for the column.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridColumn
    */
    public function footerTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('footerTemplate', $value);
    }

    /**
    * Sets the footerTemplate option of the GridColumn.
    * The template which renders the footer table cell for the column.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\GridColumn
    */
    public function footerTemplate($value) {
        return $this->setProperty('footerTemplate', $value);
    }

    /**
    * The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a standard number format,
custom number format, standard date format or a custom date format.
    * @param string $value
    * @return \Kendo\UI\GridColumn
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Sets the groupHeaderTemplate option of the GridColumn.
    * The template which renders the group header when the grid is grouped by the column field. By default the name of the field
and the current group value is displayed.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridColumn
    */
    public function groupHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('groupHeaderTemplate', $value);
    }

    /**
    * Sets the groupHeaderTemplate option of the GridColumn.
    * The template which renders the group header when the grid is grouped by the column field. By default the name of the field
and the current group value is displayed.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\GridColumn
    */
    public function groupHeaderTemplate($value) {
        return $this->setProperty('groupHeaderTemplate', $value);
    }

    /**
    * Sets the groupFooterTemplate option of the GridColumn.
    * The template which renders the group footer when the grid is grouped by the column field. By default the group footer is not displayed.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridColumn
    */
    public function groupFooterTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('groupFooterTemplate', $value);
    }

    /**
    * Sets the groupFooterTemplate option of the GridColumn.
    * The template which renders the group footer when the grid is grouped by the column field. By default the group footer is not displayed.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\GridColumn
    */
    public function groupFooterTemplate($value) {
        return $this->setProperty('groupFooterTemplate', $value);
    }

    /**
    * HTML attributes of the column header. The grid renders a table header cell (<th>) for every column. The headerAttributes option can be used to set the HTML attributes of that th.
    * @param  $value
    * @return \Kendo\UI\GridColumn
    */
    public function headerAttributes($value) {
        return $this->setProperty('headerAttributes', $value);
    }

    /**
    * Sets the headerTemplate option of the GridColumn.
    * The template which renders the column header content. By default the value of the title column option
is displayed in the column header cell.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridColumn
    */
    public function headerTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('headerTemplate', $value);
    }

    /**
    * Sets the headerTemplate option of the GridColumn.
    * The template which renders the column header content. By default the value of the title column option
is displayed in the column header cell.
    * @param string $value The template content.
    * @return \Kendo\UI\GridColumn
    */
    public function headerTemplate($value) {
        return $this->setProperty('headerTemplate', $value);
    }

    /**
    * If set to true the column will not be displayed in the grid. By default all columns are displayed.
    * @param boolean $value
    * @return \Kendo\UI\GridColumn
    */
    public function hidden($value) {
        return $this->setProperty('hidden', $value);
    }

    /**
    * If set to true the user can click the column header and sort the grid by the column field when sorting is enabled. If set to false sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the sortable option.
    * @param boolean $value
    * @return \Kendo\UI\GridColumn
    */
    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    /**
    * Sets the template option of the GridColumn.
    * The template which renders the column content. The grid renders table rows (<tr>) which represent the data source items.
Each table row consists of table cells (<td>) which represent the grid columns. By default the HTML-encoded value of the field is displayed in the column.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridColumn
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GridColumn.
    * The template which renders the column content. The grid renders table rows (<tr>) which represent the data source items.
Each table row consists of table cells (<td>) which represent the grid columns. By default the HTML-encoded value of the field is displayed in the column.
    * @param string $value The template content.
    * @return \Kendo\UI\GridColumn
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The text that is displayed in the column header cell. If not set the field is used.
    * @param string $value
    * @return \Kendo\UI\GridColumn
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The width of the column. Numeric values are treated as pixels. For more important information, please refer to Column Widths.
    * @param string|float $value
    * @return \Kendo\UI\GridColumn
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * An array of values that will be displayed instead of the bound value. Each item in the array must have a text and value fields.
    * @param array $value
    * @return \Kendo\UI\GridColumn
    */
    public function values($value) {
        return $this->setProperty('values', $value);
    }

    /**
    * If set to true the column will be visible in the grid column menu. By default the column menu includes all data-bound columns (ones that have their field set).
    * @param boolean $value
    * @return \Kendo\UI\GridColumn
    */
    public function menu($value) {
        return $this->setProperty('menu', $value);
    }

//<< Properties
}

?>
