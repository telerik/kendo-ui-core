<?php

namespace Kendo\UI;

class GridEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the text that will be used in confirmation box when delete an item.
    * @param boolean|string $value
    * @returns \Kendo\UI\GridEditable
    */
    public function confirmation($value) {
        return $this->setProperty('confirmation', $value);
    }

    /**
    * Indicates whether the created record should be inserted at the top or at the bottom of the current page. Available values are "top" and "bottom".
    * @param string $value
    * @returns \Kendo\UI\GridEditable
    */
    public function createAt($value) {
        return $this->setProperty('createAt', $value);
    }

    /**
    * Indicates whether item should be deleted when click on delete button.
    * @param boolean $value
    * @returns \Kendo\UI\GridEditable
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Indicates which of the available edit modes(incell(default)/inline/popup) will be used
    * @param string $value
    * @returns \Kendo\UI\GridEditable
    */
    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

    /**
    * Template which will be use during popup editing
    * @param string $value
    * @returns \Kendo\UI\GridEditable
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Indicates whether item should be switched to edit mode on click.
    * @param boolean $value
    * @returns \Kendo\UI\GridEditable
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
