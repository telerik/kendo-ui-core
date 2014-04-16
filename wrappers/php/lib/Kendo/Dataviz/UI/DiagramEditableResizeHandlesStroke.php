<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandlesStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the handles stroke color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Specifies the handles stroke width.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Specifies the handles stroke dash type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

//<< Properties
}

?>
