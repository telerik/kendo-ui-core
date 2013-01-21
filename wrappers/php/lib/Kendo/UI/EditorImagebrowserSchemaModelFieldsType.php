<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModelFieldsType extends \Kendo\SerializableObject {
//>> Properties

    public function parse($value) {
        return $this->setProperty('parse', new \Kendo\JavaScriptFunction($value));
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

//<< Properties
}

?>
