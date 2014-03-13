<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeRotation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The rotation angle.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeRotation
    */
    public function angle($value) {
        return $this->setProperty('angle', $value);
    }

//<< Properties
}

?>
