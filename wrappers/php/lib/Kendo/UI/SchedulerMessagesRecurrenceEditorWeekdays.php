<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditorWeekdays extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "day" displayed in the repeat by section of the monthly recurrence pattern.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekdays
    */
    public function day($value) {
        return $this->setProperty('day', $value);
    }

    /**
    * The text similar to "weekday" displayed in the repeat by section of the monthly recurrence pattern.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekdays
    */
    public function weekday($value) {
        return $this->setProperty('weekday', $value);
    }

    /**
    * The text similar to "weekend" displayed in the repeat by section of the monthly recurrence pattern.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekdays
    */
    public function weekend($value) {
        return $this->setProperty('weekend', $value);
    }

//<< Properties
}

?>
