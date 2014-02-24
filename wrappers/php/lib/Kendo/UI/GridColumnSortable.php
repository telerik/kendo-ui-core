<?php

namespace Kendo\UI;

class GridColumnSortable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the compare option of the GridColumnSortable.
    * A JavaScript function which is used to compare the values - should return -1 if first argument is less than second one, 0 if both are the same or +1 if the second one is greater that then first one.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\GridColumnSortable
    */
    public function compare($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('compare', $value);
    }

//<< Properties
}

?>
