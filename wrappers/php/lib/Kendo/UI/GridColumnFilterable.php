<?php

namespace Kendo\UI;

class GridColumnFilterable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The role data attribute of the widget used in the filter menu or a JavaScript function which initializes that widget.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\GridColumnFilterable
    */
    public function ui($value) {
        return $this->setProperty('ui', $value);
    }

//<< Properties
}

?>
