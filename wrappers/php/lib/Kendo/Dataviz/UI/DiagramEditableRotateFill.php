<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotateFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the fill color of the rotation thumb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the fill opacity of the rotation thumb.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
