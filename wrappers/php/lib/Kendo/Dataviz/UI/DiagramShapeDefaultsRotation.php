<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaultsRotation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * this is an object right now and contains only an angle
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsRotation
    */
    public function angle($value) {
        return $this->setProperty('angle', $value);
    }

//<< Properties
}

?>
