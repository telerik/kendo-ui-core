<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotateThumbStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the thumb stroke color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumbStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the thumb stroke width.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumbStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Specifies the thumb stroke dash type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumbStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

//<< Properties
}

?>
