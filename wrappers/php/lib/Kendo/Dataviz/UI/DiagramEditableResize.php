<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResize extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the handles style.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandles|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResize
    */
    public function handles($value) {
        return $this->setProperty('handles', $value);
    }

//<< Properties
}

?>
