<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModel extends \Kendo\SerializableObject {
//>> Properties

    public function id($value) {
        $this->setProperty('id', $value);

        return $this;
    }

    public function fields(\Kendo\UI\EditorImagebrowserSchemaModelFields $value) {
        $this->setProperty('fields', $value);

        return $this;
    }

//<< Properties
}

?>
