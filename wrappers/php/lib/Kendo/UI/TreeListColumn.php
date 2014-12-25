<?php

namespace Kendo\UI;

class TreeListColumn extends \Kendo\SerializableObject {
//>> Properties

    /**
    * HTML attributes of the table cell (<td>) rendered for the column.
    * @param  $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function attributes($value) {
        return $this->setProperty('attributes', $value);
    }

    /**
    * Adds TreeListColumnCommandItem to the TreeListColumn.
    * @param \Kendo\UI\TreeListColumnCommandItem|array,... $value one or more TreeListColumnCommandItem to add.
    * @return \Kendo\UI\TreeListColumn
    */
    public function addCommandItem($value) {
        return $this->add('command', func_get_args());
    }

    /**
    * Sets the editor option of the TreeListColumn.
    * Provides a way to specify a custom editing UI for the column. Use the container parameter to create the editing UI.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeListColumn
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
    * @return \Kendo\UI\TreeListColumn
    */
    public function encoded($value) {
        return $this->setProperty('encoded', $value);
    }

    /**
    * If set to true the column will show the icons that are used for exapdning and collapsing of child rows. By default, the first column of the TreeList is expandable.
    * @param boolean $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function expandable($value) {
        return $this->setProperty('expandable', $value);
    }

    /**
    * The field to which the column is bound. The value of this field is displayed by the column during data binding.
The field name should be a valid Javascript identifier and should contain no spaces, no special characters, and the first character should be a letter.
    * @param string $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * Sets the footerTemplate option of the TreeListColumn.
    * The template which renders the footer table cell for the column.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\TreeListColumn
    */
    public function footerTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('footerTemplate', $value);
    }

    /**
    * Sets the footerTemplate option of the TreeListColumn.
    * The template which renders the footer table cell for the column.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\TreeListColumn
    */
    public function footerTemplate($value) {
        return $this->setProperty('footerTemplate', $value);
    }

    /**
    * The format that is applied to the value before it is displayed. Takes the form "{0:format}" where "format" is a standard number format,
custom number format, standard date format or a custom date format.
    * @param string $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * HTML attributes of the table header cell (<th>) rendered for the column.
    * @param  $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function headerAttributes($value) {
        return $this->setProperty('headerAttributes', $value);
    }

    /**
    * Sets the headerTemplate option of the TreeListColumn.
    * The template which renders the column header content. By default the value of the title column option
is displayed in the column header cell.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\TreeListColumn
    */
    public function headerTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('headerTemplate', $value);
    }

    /**
    * Sets the headerTemplate option of the TreeListColumn.
    * The template which renders the column header content. By default the value of the title column option
is displayed in the column header cell.
    * @param string $value The template content.
    * @return \Kendo\UI\TreeListColumn
    */
    public function headerTemplate($value) {
        return $this->setProperty('headerTemplate', $value);
    }

    /**
    * If set to true the user can click the column header and sort the treelist by the column field when sorting is enabled. If set to false sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the sortable option.
    * @param boolean|\Kendo\UI\TreeListColumnSortable|array $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    /**
    * Sets the template option of the TreeListColumn.
    * The template which renders the column content. The treelist renders table rows (<tr>) which represent the data source items.
Each table row consists of table cells (<td>) which represent the treelist columns. By default the HTML-encoded value of the field is displayed in the column.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\TreeListColumn
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the TreeListColumn.
    * The template which renders the column content. The treelist renders table rows (<tr>) which represent the data source items.
Each table row consists of table cells (<td>) which represent the treelist columns. By default the HTML-encoded value of the field is displayed in the column.
    * @param string $value The template content.
    * @return \Kendo\UI\TreeListColumn
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The text that is displayed in the column header cell. If not set the field is used.
    * @param string $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The width of the column. Numeric values are treated as pixels. For more important information, please refer to Column Widths.
    * @param string|float $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * If set to true a filter menu will be displayed for this column when filtering is enabled. If set to false the filter menu will not be displayed. By default a filter menu is displayed
for all columns when filtering is enabled via the filterable option.Can be set to a JavaScript object which represents the filter menu configuration.
    * @param boolean|\Kendo\UI\TreeListColumnFilterable|array $value
    * @return \Kendo\UI\TreeListColumn
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

//<< Properties
}

?>
