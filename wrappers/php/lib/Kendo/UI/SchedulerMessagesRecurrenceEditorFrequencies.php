<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditorFrequencies extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Daily" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorFrequencies
    */
    public function daily($value) {
        return $this->setProperty('daily', $value);
    }

    /**
    * The text similar to "Monthly" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorFrequencies
    */
    public function monthly($value) {
        return $this->setProperty('monthly', $value);
    }

    /**
    * The text similar to "Never" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorFrequencies
    */
    public function never($value) {
        return $this->setProperty('never', $value);
    }

    /**
    * The text similar to "Weekly" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorFrequencies
    */
    public function weekly($value) {
        return $this->setProperty('weekly', $value);
    }

    /**
    * The text similar to "Yearly" displayed in the scheduler recurrence editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditorFrequencies
    */
    public function yearly($value) {
        return $this->setProperty('yearly', $value);
    }

//<< Properties
}

?>
