<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionHoverStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the highlight color when the pointer is hovering over the connection.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionHoverStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

//<< Properties
}

?>
