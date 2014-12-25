<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotateStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the stroke color of the rotation thumb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the stroke thickness of the rotation thumb.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
