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

    /**
    * Adds DiagramShapeDefaultsEditableTool to the DiagramShapeDefaultsEditable.
    * @param \Kendo\Dataviz\UI\DiagramShapeDefaultsEditableTool|array,... $value one or more DiagramShapeDefaultsEditableTool to add.
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsEditable
    */
    public function addTool($value) {
        return $this->add('tools', func_get_args());
    }

//<< Properties
}

?>
