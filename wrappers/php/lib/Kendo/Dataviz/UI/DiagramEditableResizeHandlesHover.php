<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesHover extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the fill settings on hovering over the resizing handles. See the editable.resize configuration for an example.
    * @param string|\Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Specifies the stroke on hovering over the resizing handles. See the editable.resize configuration for an example.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
