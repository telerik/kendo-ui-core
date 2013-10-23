<?php

namespace Kendo\UI;

class SchedulerGroup extends \Kendo\SerializableObject {
//>> Properties

    /**
    * An array of resource names by which the scheduler events will be grouped.
    * @param array $value
    * @return \Kendo\UI\SchedulerGroup
    */
    public function resources($value) {
        return $this->setProperty('resources', $value);
    }

    /**
    * The orientation of the group headers. Supported values are horizontal or vertical. Note that the agenda view is always in vertical orientation.
    * @param string $value
    * @return \Kendo\UI\SchedulerGroup
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

//<< Properties
}

?>
