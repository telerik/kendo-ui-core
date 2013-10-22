<?php

namespace Kendo\UI;

class EditorImageBrowserSchemaModel extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the field which acts as an identifier.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserSchemaModel
    */
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    /**
    * 
    * @param \Kendo\UI\EditorImageBrowserSchemaModelFields|array $value
    * @return \Kendo\UI\EditorImageBrowserSchemaModel
    */
    public function fields($value) {
        return $this->setProperty('fields', $value);
    }

//<< Properties
}

?>
