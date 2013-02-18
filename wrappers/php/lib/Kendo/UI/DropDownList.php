<?php

namespace Kendo\UI;

class DropDownList extends \Kendo\UI\Widget {
    protected function name() {
        return 'DropDownList';
    }
//>> Properties

    /**
    * Animations to be used for opening/closing the popup. Setting to false will turn of the animation.
    * @param \Kendo\UI\DropDownListAnimation|array $value
    * @return \Kendo\UI\DropDownList
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Controls whether to bind the widget on initialization.
    * @param boolean $value
    * @return \Kendo\UI\DropDownList
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Use it to set the Id of the parent DropDownList.
    * @param string $value
    * @return \Kendo\UI\DropDownList
    */
    public function cascadeFrom($value) {
        return $this->setProperty('cascadeFrom', $value);
    }

    /**
    * Sets the data source of the DropDownList.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\DropDownList
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the field of the data item that provides the text content of the list items.
    * @param string $value
    * @return \Kendo\UI\DropDownList
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * Sets the field of the data item that provides the value content of the list items.
    * @param string $value
    * @return \Kendo\UI\DropDownList
    */
    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

    /**
    * Specifies the delay in ms before the search text typed by the end user is cleared.
    * @param float $value
    * @return \Kendo\UI\DropDownList
    */
    public function delay($value) {
        return $this->setProperty('delay', $value);
    }

    /**
    * Controls whether the DropDownList should be initially enabled.
    * @param boolean $value
    * @return \Kendo\UI\DropDownList
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Define the height of the drop-down list in pixels.
    * @param float $value
    * @return \Kendo\UI\DropDownList
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Controls whether the search should be case sensitive.
    * @param string $value
    * @return \Kendo\UI\DropDownList
    */
    public function ignoreCase($value) {
        return $this->setProperty('ignoreCase', $value);
    }

    /**
    * Defines the initial selected item.
    * @param float $value
    * @return \Kendo\UI\DropDownList
    */
    public function index($value) {
        return $this->setProperty('index', $value);
    }

    /**
    * Define the text of the default empty item. If the value is an object, then the widget will use it directly.
 Note that object should have atleast the dataValueField and dataTextField properties. Otherwise, widget will show undefined.
    * @param string| $value
    * @return \Kendo\UI\DropDownList
    */
    public function optionLabel($value) {
        return $this->setProperty('optionLabel', $value);
    }

    /**
    * Sets the template option of the DropDownList.
    * Template to be used for rendering the items in the list.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\DropDownList
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the DropDownList.
    * Template to be used for rendering the items in the list.
    * @param string $value The template content.
    * @return \Kendo\UI\DropDownList
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Define the text of the widget, when the autoBind is set to false.
    * @param string $value
    * @return \Kendo\UI\DropDownList
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Define the value of the widget
    * @param string $value
    * @return \Kendo\UI\DropDownList
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the DropDownList.
    * Fires when the value has been changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\DropDownList
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
    * @return \Kendo\UI\DropDownList
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
    * @return \Kendo\UI\DropDownList
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
    * @return \Kendo\UI\DropDownList
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
    * @return \Kendo\UI\DropDownList
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
    * @return \Kendo\UI\DropDownList
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
