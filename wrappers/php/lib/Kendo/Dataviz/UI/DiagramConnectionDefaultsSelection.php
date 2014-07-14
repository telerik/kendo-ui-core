<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaultsSelection extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the connection selection handles configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsSelectionHandles|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaultsSelection
    */
    public function handles($value) {
        return $this->setProperty('handles', $value);
    }

//<< Properties
}

?>
