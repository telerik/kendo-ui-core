<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the handles fill color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the handles fill opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
