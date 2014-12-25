<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotate extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the fill settings of the rotation thumb.
    * @param \Kendo\Dataviz\UI\DiagramEditableRotateFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotate
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Specifies the stroke settings of the rotation thumb.
    * @param \Kendo\Dataviz\UI\DiagramEditableRotateStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotate
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
