<?php

namespace Kendo\UI;

class GridFilterable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Indicates whether second filter input is enabled/disabled.
    * @param boolean $value
    * @return \Kendo\UI\GridFilterable
    */
    public function extra($value) {
        return $this->setProperty('extra', $value);
    }

    /**
    * Sets the filter menu messages.
    * @param mixed|\Kendo\UI\GridFilterableMessages $value
    * @return \Kendo\UI\GridFilterable
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * Enable/Disable and set the text of filter operators.
    * @param mixed|\Kendo\UI\GridFilterableOperators $value
    * @return \Kendo\UI\GridFilterable
    */
    public function operators($value) {
        return $this->setProperty('operators', $value);
    }

//<< Properties
}

?>
