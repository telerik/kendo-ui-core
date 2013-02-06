<?php

namespace Kendo\UI;

class EditorToolItem extends \kendo\SerializableObject {
//>> Properties

    /**
    * The string that the popup item will show.
    * @param string $value
    * @return \Kendo\UI\EditorToolItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The value that will be applied by the tool when this item is selected.
    * @param string $value
    * @return \Kendo\UI\EditorToolItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
