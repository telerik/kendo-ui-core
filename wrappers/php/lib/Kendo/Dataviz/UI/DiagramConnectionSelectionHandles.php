<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionSelectionHandles extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the handles fill options.
    * @param string|\Kendo\Dataviz\UI\DiagramConnectionSelectionHandlesFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionSelectionHandles
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Defines the handles stroke options.
    * @param \Kendo\Dataviz\UI\DiagramConnectionSelectionHandlesStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionSelectionHandles
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
