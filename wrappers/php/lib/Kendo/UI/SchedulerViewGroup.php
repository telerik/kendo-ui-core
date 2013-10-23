<?php

namespace Kendo\UI;

class SchedulerViewGroup extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The orientation of the group headers. Supported values are horizontal or vertical. Note that the agenda view is always in vertical orientation.
    * @param string $value
    * @return \Kendo\UI\SchedulerViewGroup
    */
    public function orientation($value) {
        return $this->setProperty('orientation', $value);
    }

//<< Properties
}

?>
