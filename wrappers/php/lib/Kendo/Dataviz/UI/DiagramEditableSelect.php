<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableSelect extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the thumb backgorund.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableSelect
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * Specifies the select stroke styles.
    * @param \Kendo\Dataviz\UI\DiagramEditableSelectStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableSelect
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
