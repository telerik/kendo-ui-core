<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesHoverFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the handles hover fill color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Set the handles hover fill opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
