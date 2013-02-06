<?php

namespace Kendo\UI;

class GridEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the text that will be used in confirmation box when delete an item.
    * @param boolean|string $value
    * @return \Kendo\UI\GridEditable
    */
    public function confirmation($value) {
        return $this->setProperty('confirmation', $value);
    }

    /**
    * Indicates whether the created record should be inserted at the top or at the bottom of the current page. Available values are "top" and "bottom".
    * @param string $value
    * @return \Kendo\UI\GridEditable
    */
    public function createAt($value) {
        return $this->setProperty('createAt', $value);
    }

    /**
    * Indicates whether item should be deleted when click on delete button.
    * @param boolean $value
    * @return \Kendo\UI\GridEditable
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Indicates which of the available edit modes(incell(default)/inline/popup) will be used
    * @param string $value
    * @return \Kendo\UI\GridEditable
    */
    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

    /**
    * Sets the template option of the GridEditable.
    * Template which will be use during popup editing
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridEditable
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GridEditable.
    * Template which will be use during popup editing
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\GridEditable
    */
    public function template($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('template', $value);
    }

    /**
    * Indicates whether item should be switched to edit mode on click.
    * @param boolean $value
    * @return \Kendo\UI\GridEditable
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
