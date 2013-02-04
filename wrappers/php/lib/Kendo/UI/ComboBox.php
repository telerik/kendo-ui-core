<?php

namespace Kendo\UI;

class ComboBox extends \Kendo\UI\Widget {
    protected function name() {
        return 'ComboBox';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('input', true);
    }

//>> Properties

    /**
    * Animations to be used for opening/closing the popup. Setting to false will turn off the animation.
    * @param \Kendo\UI\ComboBoxAnimation|array $value
    * @return \Kendo\UI\ComboBox
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Controls whether to bind the widget to the DataSource on initialization.
    * @param boolean $value
    * @return \Kendo\UI\ComboBox
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Use it to set the Id of the parent DropDownList.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function cascadeFrom($value) {
        return $this->setProperty('cascadeFrom', $value);
    }

    /**
    * Sets the data source of the ComboBox.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\ComboBox
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the field of the data item that provides the text content of the list items.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides the value content of the list items.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

    /**
    * Specifies the delay in ms after which the ComboBox will start filtering dataSource.
    * @param float $value
    * @return \Kendo\UI\ComboBox
    */
    public function delay($value) {
        return $this->setProperty('delay', $value);
    }

    /**
    * Controls whether the ComboBox should be initially enabled.
    * @param boolean $value
    * @return \Kendo\UI\ComboBox
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Defines the type of filtration. If "none" the ComboBox will not filter the items.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function filter($value) {
        return $this->setProperty('filter', $value);
    }

    /**
    * Define the height of the drop-down list in pixels.
    * @param float $value
    * @return \Kendo\UI\ComboBox
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Controls whether the first item will be automatically highlighted.
    * @param boolean $value
    * @return \Kendo\UI\ComboBox
    */
    public function highlightFirst($value) {
        return $this->setProperty('highlightFirst', $value);
    }

    /**
    * Defines whether the filtration should be case sensitive.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function ignoreCase($value) {
        return $this->setProperty('ignoreCase', $value);
    }

    /**
    * Defines the initial selected item.
    * @param float $value
    * @return \Kendo\UI\ComboBox
    */
    public function index($value) {
        return $this->setProperty('index', $value);
    }

    /**
    * Specifies the minimum characters that should be typed before the ComboBox activates
    * @param float $value
    * @return \Kendo\UI\ComboBox
    */
    public function minLength($value) {
        return $this->setProperty('minLength', $value);
    }

    /**
    * A string that appears in the textbox when the combobox has no value.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

    /**
    * Controls whether the ComboBox should automatically auto-type the rest of text.
    * @param boolean $value
    * @return \Kendo\UI\ComboBox
    */
    public function suggest($value) {
        return $this->setProperty('suggest', $value);
    }

    /**
    * Template to be used for rendering the items in the list.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Define the text of the widget, when the autoBind is set to false.
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Define the value of the widget
    * @param string $value
    * @return \Kendo\UI\ComboBox
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the ComboBox.
    * Fires when the value has been changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ComboBox
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the close event of the ComboBox.
    * Fires when the drop-down list is closed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ComboBox
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the dataBound event of the ComboBox.
    * Fires when the ComboBox has received data from the data source.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ComboBox
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the open event of the ComboBox.
    * Fires when the drop-down list is opened
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ComboBox
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }

    /**
    * Sets the select event of the ComboBox.
    * Triggered when a Li element is selected.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ComboBox
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the cascade event of the ComboBox.
    * Triggered when value of the widget is changed via API or user interaction.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ComboBox
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
