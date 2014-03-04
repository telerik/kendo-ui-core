<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeRotation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * 
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeRotation
    */
    public function angle($value) {
        return $this->setProperty('angle', $value);
    }

//<< Properties
}

?>
