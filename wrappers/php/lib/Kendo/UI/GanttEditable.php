<?php

namespace Kendo\UI;

class GanttEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the gantt will display a confirmation dialog when the user deletes a task or a dependency.
    * @param boolean $value
    * @return \Kendo\UI\GanttEditable
    */
    public function confirmation($value) {
        return $this->setProperty('confirmation', $value);
    }

//<< Properties
}

?>
