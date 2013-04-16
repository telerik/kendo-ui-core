<?php

namespace Kendo\UI;

class GridToolbarItem extends \Kendo\SerializableObject {
    function __construct($name = null) {
        $this->name($name);
    }
//>> Properties

    /**
    * The name of the toolbar command. Either a built-in ("cancel", "create" and "save") or custom.
    * @param string $value
    * @return \Kendo\UI\GridToolbarItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Sets the template option of the GridToolbarItem.
    * The template which renders the command. Be default renders a button.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridToolbarItem
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GridToolbarItem.
    * The template which renders the command. Be default renders a button.
    * @param string $value The template content.
    * @return \Kendo\UI\GridToolbarItem
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The text displayed by the command button. If not set the name` option would be used as the button text instead.
    * @param string $value
    * @return \Kendo\UI\GridToolbarItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
