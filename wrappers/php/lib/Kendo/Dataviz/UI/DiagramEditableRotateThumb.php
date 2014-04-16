<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotateThumb extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the thumb backgorund.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotateThumb
    */
    public function background($value) {
        return $this->setProperty('background', $value);
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
