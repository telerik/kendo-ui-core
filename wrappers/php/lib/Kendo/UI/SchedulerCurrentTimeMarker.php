<?php

namespace Kendo\UI;

class SchedulerCurrentTimeMarker extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The update interval of the "current time" marker, in milliseconds.
    * @param float $value
    * @return \Kendo\UI\SchedulerCurrentTimeMarker
    */
    public function updateInterval($value) {
        return $this->setProperty('updateInterval', $value);
    }

    /**
    * If set to false the "current time" marker would be displayed using the scheduler timezone.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerCurrentTimeMarker
    */
    public function useLocalTimezone($value) {
        return $this->setProperty('useLocalTimezone', $value);
    }

//<< Properties
}

?>
