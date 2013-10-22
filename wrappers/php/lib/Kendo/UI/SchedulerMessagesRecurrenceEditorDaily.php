<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditorDaily extends \kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to " day(s)" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorDaily
    */
    public function days($value) {
        return $this->setProperty('days', $value);
    }

    /**
    * The text similar to "Repeat every: " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorDaily
    */
    public function repeatEvery($value) {
        return $this->setProperty('repeatEvery', $value);
    }

//<< Properties
}

?>
