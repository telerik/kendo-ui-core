<?php

namespace Kendo\UI;

class GanttCurrentTimeMarker extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The update interval of the "current time" marker, in milliseconds.
    * @param float $value
    * @return \Kendo\UI\GanttCurrentTimeMarker
    */
    public function updateInterval($value) {
        return $this->setProperty('updateInterval', $value);
    }

//<< Properties
}

?>
