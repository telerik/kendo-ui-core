<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModel extends \Kendo\SerializableObject {
//>> Properties

    public function setID($value) {
        $this->setProperty('id', $value);

        return $this;
    }

    public function setFields(\Kendo\UI\EditorImagebrowserSchemaModelFields $value) {
        $this->setProperty('fields', $value);

        return $this;
    }

//<< Properties
}

?>
