<?php

namespace Kendo\UI;

class EditorImagebrowserSchemaModel extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the field which acts as an identifier.
    * @param string $value
    * @return \Kendo\UI\EditorImagebrowserSchemaModel
    */
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    /**
    * 
    * @param mixed|\Kendo\UI\EditorImagebrowserSchemaModelFields $value
    * @return \Kendo\UI\EditorImagebrowserSchemaModel
    */
    public function fields($value) {
        return $this->setProperty('fields', $value);
    }

//<< Properties
}

?>
