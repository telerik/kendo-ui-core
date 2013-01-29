<?php

namespace Kendo\UI;

class AutoComplete extends \Kendo\UI\Widget {
    protected function name() {
        return 'AutoComplete';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('input', true);
    }
//>> Properties

    /**
    * Animations to be used for opening/closing the popup. Setting to false will turn of the animation.
    * @param \Kendo\UI\AutoCompleteAnimation $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function animation(\Kendo\UI\AutoCompleteAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Sets the data source of the AutoComplete.
    * @param \Kendo\Data\DataSource $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the field of the data item that provides the text content of the list items.
    * @param string $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Specifies the delay in ms after which the AutoComplete will start filtering the dataSource.
    * @param float $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function delay($value) {
        return $this->setProperty('delay', $value);
    }

    /**
    * Controls whether the AutoComplete should be initially enabled.
    * @param boolean $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Defines the type of filtration. This value is handled by the remote data source.
    * @param string $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * Sets the height of the drop-down list in pixels.
    * @param float $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Controls whether the first item will be automatically highlighted.
    * @param boolean $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function highlightFirst($value) {
        return $this->setProperty('highlightFirst', $value);
    }

    /**
    * Defines whether the filtration should be case sensitive.
    * @param boolean $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function ignoreCase($value) {
        return $this->setProperty('ignoreCase', $value);
    }

    /**
    * Specifies the minimum number of characters that should be typed before the AutoComplete queries
the dataSource.
    * @param float $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function minLength($value) {
        return $this->setProperty('minLength', $value);
    }

    /**
    * A string that appears in the textbox when it has no value.
    * @param string $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    /**
    * Sets the separator for completion. Empty by default, allowing for only one completion.
    * @param string $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function separator($value) {
        return $this->setProperty('separator', $value);
    }

    /**
    * Controls whether the AutoComplete should automatically auto-type the rest of text.
    * @param boolean $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function suggest($value) {
        return $this->setProperty('suggest', $value);
    }

    /**
    * Template to be used for rendering the items in the list.
    * @param string $value
    * @returns \Kendo\UI\AutoComplete
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Sets the change event of the AutoComplete.
    * Fires when the value has been changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\AutoComplete
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the close event of the AutoComplete.
    * Fires when the drop-down list is closed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\AutoComplete
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the dataBound event of the AutoComplete.
    * Fires when the AutoComplete has received data from the data source.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\AutoComplete
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the open event of the AutoComplete.
    * Fires when the drop-down list is opened
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\AutoComplete
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the select event of the AutoComplete.
    * Triggered when a Li element is selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @returns \Kendo\UI\AutoComplete
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
