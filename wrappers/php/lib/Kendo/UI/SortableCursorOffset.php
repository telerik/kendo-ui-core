<?php

namespace Kendo\UI;

class SortableCursorOffset extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The left offset of the hint element relative to the mouse cursor/finger.
    * @param float $value
    * @return \Kendo\UI\SortableCursorOffset
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The top offset of the hint element relative to the mouse cursor/finger.
    * @param float $value
    * @return \Kendo\UI\SortableCursorOffset
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
