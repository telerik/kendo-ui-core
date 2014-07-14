<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaultsEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies whether the connectors should appear on hover.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsEditable
    */
    public function connect($value) {
        return $this->setProperty('connect', $value);
    }

//<< Properties
}

?>
