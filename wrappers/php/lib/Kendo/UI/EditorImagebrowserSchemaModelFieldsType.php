<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModelFieldsType extends \Kendo\SerializableObject {
//>> Properties

    public function parse($value) {
        $this->setProperty('parse', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

//<< Properties
}

?>
