<?php

namespace Kendo\UI;

class GridColumnFilterable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Role of the widget shown as column filter menu input element.
    * @param string|\kendo\JavaScriptFunction $value
    */
    public function ui($value) {
        return $this->setProperty('ui', $value);
    }

//<< Properties
}

?>
