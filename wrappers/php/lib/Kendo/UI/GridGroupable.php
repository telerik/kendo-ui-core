<?php

namespace Kendo\UI;

class GridGroupable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the messages displayed during grouping.
    * @param mixed|\Kendo\UI\GridGroupableMessages $value
    * @return \Kendo\UI\GridGroupable
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
