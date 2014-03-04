<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeHover extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Hover's background color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeHover
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

//<< Properties
}

?>
