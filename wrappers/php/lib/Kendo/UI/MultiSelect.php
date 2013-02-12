<?php

namespace Kendo\UI;

class MultiSelect extends \Kendo\UI\Widget {
    public function name() {
        return 'MultiSelect';
    }
//>> Properties

    /**
    * Animations to be used for opening/closing the popup. Setting to false will turn off the animation.
    * @param \Kendo\UI\MultiSelectAnimation|array $value
    * @return \Kendo\UI\MultiSelect
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Controls whether to bind the widget to the DataSource on initialization.
    * @param boolean $value
    * @return \Kendo\UI\MultiSelect
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
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
    * Sets the field of the data item that provides the text content of the list items.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides the value content of the list items.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

    /**
    * Specifies the delay in ms after which the multiselect will start filtering dataSource.
    * @param float $value
    * @return \Kendo\UI\MultiSelect
    */
    public function delay($value) {
        return $this->setProperty('delay', $value);
    }

    /**
    * Controls whether the multiselect should be initially enabled.
    * @param boolean $value
    * @return \Kendo\UI\MultiSelect
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Defines the type of filtration.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * Define the height of the drop-down list in pixels.
    * @param float $value
    * @return \Kendo\UI\MultiSelect
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Controls whether the first item will be automatically highlighted.
    * @param boolean $value
    * @return \Kendo\UI\MultiSelect
    */
    public function highlightFirst($value) {
        return $this->setProperty('highlightFirst', $value);
    }

    /**
    * Defines whether the filtration should be case sensitive.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function ignoreCase($value) {
        return $this->setProperty('ignoreCase', $value);
    }

    /**
    * Specifies the minimum characters that should be typed before the multiselect activates
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
    * A string that appears in the textbox when the multiselect has no value.
    * @param string $value
    * @return \Kendo\UI\MultiSelect
    */
    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    /**
    * Sets the itemTemplate option of the MultiSelect.
    * Template to be used for rendering the items in the list.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\MultiSelect
    */
    public function itemTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('itemTemplate', $value);
    }

    /**
    * Sets the itemTemplate option of the MultiSelect.
    * Template to be used for rendering the items in the list.
    * @param string $value The template content.
    * @return \Kendo\UI\MultiSelect
    */
    public function itemTemplate($value) {
        return $this->setProperty('itemTemplate', $value);
    }

    /**
    * Sets the tagTemplate option of the MultiSelect.
    * Template to be used for rendering the tags of the selected items.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\MultiSelect
    */
    public function tagTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('tagTemplate', $value);
    }

    /**
    * Sets the tagTemplate option of the MultiSelect.
    * Template to be used for rendering the tags of the selected items.
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
    * Fires when the value has been changed.
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
    * Fires when the drop-down list is closed
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
    * Fires when the multiselect has received data from the data source.
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
    * Fires when the drop-down list is opened
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
    * Triggered when a Li element is selected.
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
