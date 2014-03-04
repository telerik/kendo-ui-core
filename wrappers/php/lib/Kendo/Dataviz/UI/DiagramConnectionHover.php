<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionHover extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the hover stroke configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionHoverStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionHover
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
