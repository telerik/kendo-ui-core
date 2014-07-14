<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionSelection extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the connection selection handles configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionSelectionHandles|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionSelection
    */
    public function handles($value) {
        return $this->setProperty('handles', $value);
    }

//<< Properties
}

?>
