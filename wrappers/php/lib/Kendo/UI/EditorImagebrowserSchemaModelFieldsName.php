<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModelFieldsName extends \Kendo\SerializableObject {
//>> Properties

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function parse($value) {
        return $this->setProperty('parse', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
