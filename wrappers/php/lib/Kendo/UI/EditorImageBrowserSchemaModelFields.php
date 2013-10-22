<?php

namespace Kendo\UI;

class EditorImageBrowserSchemaModelFields extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The field which contains the name of the image/directory
    * @param string|\Kendo\UI\EditorImageBrowserSchemaModelFieldsName|array $value
    * @return \Kendo\UI\EditorImageBrowserSchemaModelFields
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The field which contains the type of the entry. Either f for image or d for directory.
    * @param string|\Kendo\UI\EditorImageBrowserSchemaModelFieldsType|array $value
    * @return \Kendo\UI\EditorImageBrowserSchemaModelFields
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The field which contains the size of image.
    * @param string|\Kendo\UI\EditorImageBrowserSchemaModelFieldsSize|array $value
    * @return \Kendo\UI\EditorImageBrowserSchemaModelFields
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

//<< Properties
}

?>
