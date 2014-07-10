<?php

namespace Kendo\UI;

class GridColumnFilterable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies options for the filter cell when enabled.Can be set to a JavaScript object which represents the filter cell configuration.
    * @param \Kendo\UI\GridColumnFilterableCell|array $value
    * @return \Kendo\UI\GridColumnFilterable
    */
    public function cell($value) {
        return $this->setProperty('cell', $value);
    }

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
