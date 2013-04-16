<?php

namespace Kendo\UI;

class GridColumnCommandItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the command. The built-in commands are "edit" and "destroy". Can be set to a custom value.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The text displayed by the command button. If not set the name option is used as the button text.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The CSS class applied to the command button.
    * @param string $value
    * @return \Kendo\UI\GridColumnCommandItem
    */
    public function className($value) {
        return $this->setProperty('className', $value);
    }

    /**
    * Sets the click option of the GridColumnCommandItem.
    * The JavaScript function executed when the user clicks the command button. The function receives a jQuery Event as an argument.The function context (available via the this keyword) will be set to the grid instance.
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
