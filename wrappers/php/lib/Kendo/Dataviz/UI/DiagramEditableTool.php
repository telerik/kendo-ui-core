<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableTool extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the tool. The built-in tools are "edit", "createShape", "createConnection", "undo", "redo", "rotateClockwise" and "rotateAnticlockwise". Can be set to a custom value.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableTool
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The step of the rotateClockwise and rotateAnticlockwise tools.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableTool
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

//<< Properties
}

?>
