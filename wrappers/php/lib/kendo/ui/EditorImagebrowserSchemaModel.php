<?php

namespace kendo\ui;

class EditorImagebrowserSchemaModel extends \kendo\SerializableObject {
//>> Properties

    public function setId($value) {
        $this->setProperty('id', $value);

        return $this;
    }

    public function setFields(\kendo\ui\EditorImagebrowserSchemaModelFields $value) {
        $this->setProperty('fields', $value);

        return $this;
    }

//<< Properties
}

?>
