<?php

namespace Kendo\UI;

class TreeViewCheckboxes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Indicates the name of the checkbox inputs that will be posted to the server.
    * @param string $value
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Indicates whether checkboxes of child items should get checked when the checkbox of a parent item is checked.
    * @param boolean $value
    */
    public function checkChildren($value) {
        return $this->setProperty('checkChildren', $value);
    }

    /**
    * Template for the checkbox rendering. Used to set the  checkbox name attribute, or to add hidden inputs that will be posted along the checkboxes.
    * @param string|\kendo\JavaScriptFunction $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
