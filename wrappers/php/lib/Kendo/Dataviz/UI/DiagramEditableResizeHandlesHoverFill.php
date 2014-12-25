<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesHoverFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the fill color on hovering over the resizing handles. See the editable.resize configuration for an example.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the fill opacity on hovering over the resizing handles. See the editable.resize configuration for an example.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
