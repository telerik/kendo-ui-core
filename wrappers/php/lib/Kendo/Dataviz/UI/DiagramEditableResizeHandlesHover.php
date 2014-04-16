<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesHover extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the handles backgorund.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover
    */
    public function background($value) {
        return $this->setProperty('background', $value);
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
