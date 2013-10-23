<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditorDaily extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to " day(s)" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorDaily
    */
    public function interval($value) {
        return $this->setProperty('interval', $value);
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
