<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditorWeekly extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to " week(s)" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekly
    */
    public function interval($value) {
        return $this->setProperty('interval', $value);
    }

    /**
    * The text similar to "Repeat every: " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekly
    */
    public function repeatEvery($value) {
        return $this->setProperty('repeatEvery', $value);
    }

    /**
    * The text similar to "Repeat on: " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekly
    */
    public function repeatOn($value) {
        return $this->setProperty('repeatOn', $value);
    }

//<< Properties
}

?>
