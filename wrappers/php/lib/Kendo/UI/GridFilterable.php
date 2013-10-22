<?php

namespace Kendo\UI;

class GridFilterable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the filter menu allows the user to input a second criteria.
    * @param boolean $value
    * @return \Kendo\UI\GridFilterable
    */
    public function extra($value) {
        return $this->setProperty('extra', $value);
    }

    /**
    * The text messages displayed in the filter menu. Use it to customize or localize the filter menu messages.
    * @param \Kendo\UI\GridFilterableMessages|array $value
    * @return \Kendo\UI\GridFilterable
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * The text of the filter operators displayed in the filter menu.
    * @param \Kendo\UI\GridFilterableOperators|array $value
    * @return \Kendo\UI\GridFilterable
    */
    public function operators($value) {
        return $this->setProperty('operators', $value);
    }

//<< Properties
}

?>
