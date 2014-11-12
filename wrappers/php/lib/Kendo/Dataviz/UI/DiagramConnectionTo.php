<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionTo extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the point x value.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionTo
    */
    public function x($value) {
        return $this->setProperty('x', $value);
    }

    /**
    * Defines the point y value.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionTo
    */
    public function y($value) {
        return $this->setProperty('y', $value);
    }

//<< Properties
}

?>
