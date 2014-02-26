<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaultsHoverStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the highlight color when the pointer is hovering over the connection.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaultsHoverStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

//<< Properties
}

?>
