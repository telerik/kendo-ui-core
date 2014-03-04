<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the stroke or line color of the connection.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Defines the stroke width of the connection.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
