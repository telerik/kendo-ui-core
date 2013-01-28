<?php

namespace Kendo\UI;

class DropDownList extends \Kendo\UI\Widget {
    public function name() {
        return 'DropDownList';
    }
//>> Properties

    /**
    * Animations to be used for opening/closing the popup. Setting to false will turn of the animation.
    * @param \Kendo\UI\DropDownListAnimation $value
    */
    public function animation(\Kendo\UI\DropDownListAnimation $value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Controls whether to bind the widget on initialization.
    * @param boolean $value
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Use it to set the Id of the parent DropDownList.
    * @param string $value
    */
    public function cascadeFrom($value) {
        return $this->setProperty('cascadeFrom', $value);
    }

    /**
    * Sets the data source of the DropDownList.
    * @param \Kendo\Data\DataSource $value
    */
    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the field of the data item that provides the text content of the list items.
    * @param string $value
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides the value content of the list items.
    * @param string $value
    */
    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

    /**
    * Specifies the delay in ms before the search text typed by the end user is cleared.
    * @param float $value
    */
    public function delay($value) {
        return $this->setProperty('delay', $value);
    }

    /**
    * Controls whether the DropDownList should be initially enabled.
    * @param boolean $value
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Define the height of the drop-down list in pixels.
    * @param float $value
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Controls whether the search should be case sensitive.
    * @param string $value
    */
    public function ignoreCase($value) {
        return $this->setProperty('ignoreCase', $value);
    }

    /**
    * Defines the initial selected item.
    * @param float $value
    */
    public function index($value) {
        return $this->setProperty('index', $value);
    }

    /**
    * Define the text of the default empty item. If the value is an object, then the widget will use it directly.
    * @param string|Object $value
    */
    public function optionLabel($value) {
        return $this->setProperty('optionLabel', $value);
    }

    /**
    * Template to be used for rendering the items in the list.
    * @param string $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Define the text of the widget, when the autoBind is set to false.
    * @param string $value
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Define the value of the widget
    * @param string $value
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the DropDownList.
    * Fires when the value has been changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the close event of the DropDownList.
    * Fires when the drop-down list is closed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the dataBound event of the DropDownList.
    * Fires when the drop-down list has received data from the data source.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the open event of the DropDownList.
    * Fires when the drop-down list is opened
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the select event of the DropDownList.
    * Triggered when a Li element is selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the cascade event of the DropDownList.
    * Triggered when value of the widget is changed via API or user interaction.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function cascade($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('cascade', $value);
    }

//<< Properties
}

?>
