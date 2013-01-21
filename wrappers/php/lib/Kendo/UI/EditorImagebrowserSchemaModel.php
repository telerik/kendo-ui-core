<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModel extends \Kendo\SerializableObject {
//>> Properties

    public function id($value) {
        return $this->setProperty('id', $value);
    }

    public function fields(\Kendo\UI\EditorImagebrowserSchemaModelFields $value) {
        return $this->setProperty('fields', $value);
    }

//<< Properties
}

?>
