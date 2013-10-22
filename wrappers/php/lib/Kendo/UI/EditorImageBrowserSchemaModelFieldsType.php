<?php

namespace Kendo\UI;

class EditorImageBrowserSchemaModelFieldsType extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the parse option of the EditorImageBrowserSchemaModelFieldsType.
    * Specifies the function which will parse the field value. If not set default parsers will be used.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\EditorImageBrowserSchemaModelFieldsType
    */
    public function parse($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('parse', $value);
    }

    /**
    * The name of the field.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserSchemaModelFieldsType
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

//<< Properties
}

?>
