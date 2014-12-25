<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionPoint extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the X coordinate of the intermediate point.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionPoint
    */
    public function x($value) {
        return $this->setProperty('x', $value);
    }

    /**
    * Sets the Y coordinate of the intermediate point.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionPoint
    */
    public function y($value) {
        return $this->setProperty('y', $value);
    }

//<< Properties
}

?>
