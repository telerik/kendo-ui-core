<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModelFields extends \Kendo\SerializableObject {
//>> Properties

    public function name(\Kendo\UI\EditorImagebrowserSchemaModelFieldsName $value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function type(\Kendo\UI\EditorImagebrowserSchemaModelFieldsType $value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function size(\Kendo\UI\EditorImagebrowserSchemaModelFieldsSize $value) {
        $this->setProperty('size', $value);

        return $this;
    }

//<< Properties
}

?>
