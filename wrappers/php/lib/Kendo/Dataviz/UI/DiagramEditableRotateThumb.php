<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotateThumb extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the thumb fill options.
    * @param string|\Kendo\Dataviz\UI\DiagramEditableRotateThumbFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumb
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Specifies the thumb stroke styles.
    * @param \Kendo\Dataviz\UI\DiagramEditableRotateThumbStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumb
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
