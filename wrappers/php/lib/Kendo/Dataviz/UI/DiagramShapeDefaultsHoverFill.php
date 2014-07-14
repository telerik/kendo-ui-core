<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaultsHoverFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Hover's fill color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsHoverFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Hover's fill opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsHoverFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
