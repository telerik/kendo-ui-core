<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModelFields extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The field which contains the name of the image/directory
    * @param string|\Kendo\UI\EditorImagebrowserSchemaModelFieldsName|mixed $value
    * @return \Kendo\UI\EditorImagebrowserSchemaModelFields
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The field which contains the type of the entry. Either f for image or d for directory.
    * @param string|\Kendo\UI\EditorImagebrowserSchemaModelFieldsType|mixed $value
    * @return \Kendo\UI\EditorImagebrowserSchemaModelFields
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The field which contains the size of image.
    * @param string|\Kendo\UI\EditorImagebrowserSchemaModelFieldsSize|mixed $value
    * @return \Kendo\UI\EditorImagebrowserSchemaModelFields
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

//<< Properties
}

?>
