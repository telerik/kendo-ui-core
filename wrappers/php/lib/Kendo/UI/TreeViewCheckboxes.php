<?php

namespace Kendo\UI;

class TreeViewCheckboxes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Indicates the name of the checkbox inputs that will be posted to the server.
    * @param string $value
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Indicates whether checkboxes of child items should get checked when the checkbox of a parent item is checked.
    * @param boolean $value
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function checkChildren($value) {
        return $this->setProperty('checkChildren', $value);
    }

    /**
    * Sets the template option of the TreeViewCheckboxes.
    * Template for the checkbox rendering. Used to set the  checkbox name attribute, or to add hidden inputs that will be posted along the checkboxes.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the TreeViewCheckboxes.
    * Template for the checkbox rendering. Used to set the  checkbox name attribute, or to add hidden inputs that will be posted along the checkboxes.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function template($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
