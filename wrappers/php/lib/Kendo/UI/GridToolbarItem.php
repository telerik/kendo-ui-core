<?php

namespace Kendo\UI;

class GridToolbarItem extends \Kendo\SerializableObject {
    function __construct($name = null) {
        $this->name($name);
    }
//>> Properties

    /**
    * The name of the command. One of the predefined or a custom.
    * @param string $value
    * @return \Kendo\UI\GridToolbarItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Sets the template option of the GridToolbarItem.
    * The template for the command button.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridToolbarItem
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GridToolbarItem.
    * The template for the command button.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\GridToolbarItem
    */
    public function template($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('template', $value);
    }

    /**
    * The text of the command that will be set on the button.
    * @param string $value
    * @return \Kendo\UI\GridToolbarItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
