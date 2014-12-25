<?php

namespace Kendo\Dataviz\UI;

class DiagramSelectableStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the selection stroke color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramSelectableStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Defines the selection dash type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramSelectableStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * Defines the selection stroke width.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramSelectableStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
