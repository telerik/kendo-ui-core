<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableRotate extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifyes the thumb style.
    * @param \Kendo\Dataviz\UI\DiagramEditableRotateThumb|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableRotate
    */
    public function thumb($value) {
        return $this->setProperty('thumb', $value);
    }

//<< Properties
}

?>
