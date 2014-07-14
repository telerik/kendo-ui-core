<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies whether the connectors should appear on hover.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\DiagramShapeEditable
    */
    public function connect($value) {
        return $this->setProperty('connect', $value);
    }

//<< Properties
}

?>
