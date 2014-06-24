<?php

namespace Kendo\UI;

class EditorFileBrowserSchemaModelFields extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The field which contains the name of the file/directory
    * @param string|\Kendo\UI\EditorFileBrowserSchemaModelFieldsName|array $value
    * @return \Kendo\UI\EditorFileBrowserSchemaModelFields
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The field which contains the type of the entry. Either f for file or d for directory.
    * @param string|\Kendo\UI\EditorFileBrowserSchemaModelFieldsType|array $value
    * @return \Kendo\UI\EditorFileBrowserSchemaModelFields
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The field which contains the size of file.
    * @param string|\Kendo\UI\EditorFileBrowserSchemaModelFieldsSize|array $value
    * @return \Kendo\UI\EditorFileBrowserSchemaModelFields
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

//<< Properties
}

?>
