<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionFrom extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the point x value.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionFrom
    */
    public function x($value) {
        return $this->setProperty('x', $value);
    }

    /**
    * Defines the point y value.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionFrom
    */
    public function y($value) {
        return $this->setProperty('y', $value);
    }

//<< Properties
}

?>
