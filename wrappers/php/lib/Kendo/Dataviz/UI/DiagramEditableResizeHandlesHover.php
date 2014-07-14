<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesHover extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the handles hover fill options.
    * @param string|\Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Specifies the handles stroke styles.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
