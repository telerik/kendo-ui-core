<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditorEnd extends \kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "After " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorEnd
    */
    public function endCountAfter($value) {
        return $this->setProperty('endCountAfter', $value);
    }

    /**
    * The text similar to " occurrence(s)" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorEnd
    */
    public function endCountOccurrence($value) {
        return $this->setProperty('endCountOccurrence', $value);
    }

    /**
    * The text similar to "End:" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorEnd
    */
    public function endLabel($value) {
        return $this->setProperty('endLabel', $value);
    }

    /**
    * The text similar to "Never" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorEnd
    */
    public function endNever($value) {
        return $this->setProperty('endNever', $value);
    }

    /**
    * The text similar to "On " displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorEnd
    */
    public function endUntilOn($value) {
        return $this->setProperty('endUntilOn', $value);
    }

//<< Properties
}

?>
