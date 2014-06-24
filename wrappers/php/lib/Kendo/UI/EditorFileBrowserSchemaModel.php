<?php

namespace Kendo\UI;

class EditorFileBrowserSchemaModel extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the field which acts as an identifier.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserSchemaModel
    */
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    /**
    * 
    * @param \Kendo\UI\EditorFileBrowserSchemaModelFields|array $value
    * @return \Kendo\UI\EditorFileBrowserSchemaModel
    */
    public function fields($value) {
        return $this->setProperty('fields', $value);
    }

//<< Properties
}

?>
