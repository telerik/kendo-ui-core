<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeHoverFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Hover's fill color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeHoverFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Hover's fill opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeHoverFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
