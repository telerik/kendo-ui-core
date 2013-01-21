<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModelFieldsName extends \Kendo\SerializableObject {
//>> Properties

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function parse($value) {
        $this->setProperty('parse', $value);

        return $this;
    }

//<< Properties
}

?>
