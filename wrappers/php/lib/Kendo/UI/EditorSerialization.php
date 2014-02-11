<?php

namespace Kendo\UI;

class EditorSerialization extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded.
    * @param boolean $value
    * @return \Kendo\UI\EditorSerialization
    */
    public function entities($value) {
        return $this->setProperty('entities', $value);
    }

//<< Properties
}

?>
