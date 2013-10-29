<?php

namespace Kendo\UI;

class MultiSelect extends \Kendo\UI\Widget {
    public function name() {
        return 'MultiSelect';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('select');
    }
//>> Properties

    /**
    * Configures the opening and closing animations of the suggestion popup. Setting the animation option to false will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.
    * @param \Kendo\UI\MultiSelectAnimation|array $value
    * @return \Kendo\UI\MultiSelect
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Controls whether to bind the widget to the data source on initialization.
    * @param boolean $value
    * @return \Kendo\UI\MultiSelect
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Controls whether to close the widget suggestion list on item selection.
    * @param boolean $value
    * @return \Kendo\UI\MultiSelect
    */
    public function autoClose($value) {
        return $this->setProperty('autoClose', $value);
    }

    /**
    * Sets the data source of the MultiSelect.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\MultiSelect
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * The field of the data item that provides the value of the widget.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

    /**
    * Specifies the delay in milliseconds after which the multiselect will start filtering dataSource.
    * @param float $value
    * @return \Kendo\UI\MultiSelect
    */
    public function delay($value) {
        return $this->setProperty('delay', $value);
    }

    /**
    * If set to false the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.
    * @param boolean $value
    * @return \Kendo\UI\MultiSelect
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * The filtering method used to determine the suggestions for the current value. Filtration is turned of by default.
The supported filter values are startswith, endswith and contains.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * The height of the suggestion popup in pixels. The default value is 200 pixels.
    * @param float $value
    * @return \Kendo\UI\MultiSelect
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * If set to true the first suggestion will be automatically highlighted.
    * @param boolean $value
    * @return \Kendo\UI\MultiSelect
    */
    public function highlightFirst($value) {
        return $this->setProperty('highlightFirst', $value);
    }

    /**
    * If set to false case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function ignoreCase($value) {
        return $this->setProperty('ignoreCase', $value);
    }

    /**
    * The minimum number of characters the user must type before a search is performed. Set to higher value than 1 if the search could match a lot of items.
    * @param float $value
    * @return \Kendo\UI\MultiSelect
    */
    public function minLength($value) {
        return $this->setProperty('minLength', $value);
    }

    /**
    * Defines the limit of the selected items. If set to null widget will not limit number of the selected items.
    * @param float $value
    * @return \Kendo\UI\MultiSelect
    */
    public function maxSelectedItems($value) {
        return $this->setProperty('maxSelectedItems', $value);
    }

    /**
    * The hint displayed by the widget when it is empty. Not set by default.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    /**
    * Sets the headerTemplate option of the MultiSelect.
    * Specifies a static HTML content, which will be rendered as a header of the popup element.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\MultiSelect
    */
    public function headerTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('headerTemplate', $value);
    }

    /**
    * Sets the headerTemplate option of the MultiSelect.
    * Specifies a static HTML content, which will be rendered as a header of the popup element.
    * @param string $value The template content.
    * @return \Kendo\UI\MultiSelect
    */
    public function headerTemplate($value) {
        return $this->setProperty('headerTemplate', $value);
    }

    /**
    * Sets the itemTemplate option of the MultiSelect.
    * The template used to render the items in the popup list.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\MultiSelect
    */
    public function itemTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('itemTemplate', $value);
    }

    /**
    * Sets the itemTemplate option of the MultiSelect.
    * The template used to render the items in the popup list.
    * @param string $value The template content.
    * @return \Kendo\UI\MultiSelect
    */
    public function itemTemplate($value) {
        return $this->setProperty('itemTemplate', $value);
    }

    /**
    * Sets the tagTemplate option of the MultiSelect.
    * The template used to render the tags.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\MultiSelect
    */
    public function tagTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('tagTemplate', $value);
    }

    /**
    * Sets the tagTemplate option of the MultiSelect.
    * The template used to render the tags.
    * @param string $value The template content.
    * @return \Kendo\UI\MultiSelect
    */
    public function tagTemplate($value) {
        return $this->setProperty('tagTemplate', $value);
    }

    /**
    * Define the value of the widget
    * @param array $value
    * @return \Kendo\UI\MultiSelect
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the MultiSelect.
    * Fired when the value of the widget is changed by the user.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\MultiSelect
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the close event of the MultiSelect.
    * Fired when the popup of the widget is closed.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\MultiSelect
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the dataBound event of the MultiSelect.
    * Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\MultiSelect
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the open event of the MultiSelect.
    * Fired when the popup of the widget is opened by the user.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\MultiSelect
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the select event of the MultiSelect.
    * Fired when an item from the popup is selected by the user.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\MultiSelect
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }


//<< Properties
}

?>
