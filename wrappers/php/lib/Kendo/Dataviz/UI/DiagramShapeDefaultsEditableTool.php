<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaultsEditableTool extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the tool. The built-in tools are "edit", "delete", "rotateClockwise" and "rotateAnticlockwise". Can be set to a custom value.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsEditableTool
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The step of the rotateClockwise and rotateAnticlockwise tools.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsEditableTool
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

//<< Properties
}

?>
