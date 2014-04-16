<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableSelectStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the select stroke color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableSelectStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the select stroke width.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableSelectStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Specifies the select stroke dash type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableSelectStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

//<< Properties
}

?>
