<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the color of the shape's stroke.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the shape.The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * Defines the thickness or width of the shape's stroke.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
