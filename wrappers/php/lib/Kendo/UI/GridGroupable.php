<?php

namespace Kendo\UI;

class GridGroupable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the messages displayed during grouping.
    * @param \Kendo\UI\GridGroupableMessages $value
    */
    public function messages(\Kendo\UI\GridGroupableMessages $value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
