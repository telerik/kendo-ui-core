<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the fill color of the resizing handles. See the editable.resize configuration for an example.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the fill opacity of the resizing handles. See the editable.resize configuration for an example.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
