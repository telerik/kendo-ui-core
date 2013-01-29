<?php

namespace Kendo\UI;

class GridColumnCommandItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The unique name of the command. The supported built-in commands are: "create", "cancel", "save", "destroy".
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The text displayed by the command.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The CSS class of the command.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItem
    */
    public function className($value) {
        return $this->setProperty('className', $value);
    }

    /**
    * Sets the click option of the GridColumnCommandItem.
    * The JavaScript function executed when the user clicks the command button.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\GridColumnCommandItem
    */
    public function click($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('click', $value);
    }

//<< Properties
}

?>
