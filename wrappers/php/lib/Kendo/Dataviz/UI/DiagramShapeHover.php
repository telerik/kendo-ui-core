<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeHover extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Hover's fill options.
    * @param string|\Kendo\Dataviz\UI\DiagramShapeHoverFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramShapeHover
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

//<< Properties
}

?>
