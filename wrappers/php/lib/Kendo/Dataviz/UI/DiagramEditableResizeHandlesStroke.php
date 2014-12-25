<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the stroke color of the resizing handles. See the editable.resize configuration for an example.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the stroke dash type of the resizing handles. See the editable.resize configuration for an example.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * Specifies the stroke thickness of the resizing handles. See the editable.resize configuration for an example.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
