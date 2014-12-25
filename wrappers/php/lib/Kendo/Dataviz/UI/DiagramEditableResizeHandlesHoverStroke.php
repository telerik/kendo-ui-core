<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesHoverStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the stroke color on hovering over the resizing handles. See the editable.resize configuration for an example.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the stroke dash type on hovering over the resizing handles. See the editable.resize configuration for an example.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * Specifies the stroke color on hovering over the resizing handles. See the editable.resize configuration for an example.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHoverStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
