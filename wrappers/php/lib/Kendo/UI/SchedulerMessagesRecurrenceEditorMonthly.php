<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditorMonthly extends \kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Day " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorMonthly
    */
    public function day($value) {
        return $this->setProperty('day', $value);
    }

    /**
    * The text similar to " month(s)" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorMonthly
    */
    public function months($value) {
        return $this->setProperty('months', $value);
    }

    /**
    * The text similar to "Repeat every: " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorMonthly
    */
    public function repeatEvery($value) {
        return $this->setProperty('repeatEvery', $value);
    }

    /**
    * The text similar to "Repeat on: " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorMonthly
    */
    public function repeatOn($value) {
        return $this->setProperty('repeatOn', $value);
    }

//<< Properties
}

?>
