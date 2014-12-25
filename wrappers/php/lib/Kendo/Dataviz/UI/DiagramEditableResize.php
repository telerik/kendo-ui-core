<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResize extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the settings of the resizing handles. See the editable.resize configuration for an example.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandles|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResize
    */
    public function handles($value) {
        return $this->setProperty('handles', $value);
    }

//<< Properties
}

?>
