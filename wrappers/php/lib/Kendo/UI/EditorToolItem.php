<?php

namespace Kendo\UI;

class EditorToolItem extends \Kendo\SerializableObject {
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

    /**
    * Only applicable for the formatting tool. Specifies the context in which the option will be available.
    * @param string $value
    * @return \Kendo\UI\EditorToolItem
    */
    public function context($value) {
        return $this->setProperty('context', $value);
    }

//<< Properties
}

?>
