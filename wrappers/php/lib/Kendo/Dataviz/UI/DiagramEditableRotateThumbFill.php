<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotateThumbFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the thumb fill color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumbFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Set the thumb fill opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumbFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
