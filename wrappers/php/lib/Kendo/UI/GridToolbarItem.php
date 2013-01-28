<?php

namespace Kendo\UI;

class GridToolbarItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the command. One of the predefined or a custom.
    * @param string $value
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The template for the command button.
    * @param string $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The text of the command that will be set on the button.
    * @param string $value
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
