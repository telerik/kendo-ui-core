<?php

namespace Kendo\UI;

class SchedulerMessagesRecurrenceEditor extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The configuration of the scheduler recurrence editor daily messages. Use this option to customize or localize the scheduler recurrence editor daily messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorDaily|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function daily($value) {
        return $this->setProperty('daily', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor end messages. Use this option to customize or localize the scheduler recurrence editor end messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorEnd|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function end($value) {
        return $this->setProperty('end', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor frequencies messages. Use this option to customize or localize the scheduler recurrence editor frequencies messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorFrequencies|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function frequencies($value) {
        return $this->setProperty('frequencies', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor monthly messages. Use this option to customize or localize the scheduler recurrence editor monthly messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorMonthly|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function monthly($value) {
        return $this->setProperty('monthly', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor offsetPositions messages. Use this option to customize or localize the scheduler recurrence editor offsetPositions messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorOffsetPositions|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function offsetPositions($value) {
        return $this->setProperty('offsetPositions', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor weekly messages. Use this option to customize or localize the scheduler recurrence editor weekly messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekly|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function weekly($value) {
        return $this->setProperty('weekly', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor week days messages. Use these options to customize or localize the scheduler recurrence editor weekdays messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorWeekdays|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function weekdays($value) {
        return $this->setProperty('weekdays', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor yearly messages. Use this option to customize or localize the scheduler recurrence editor yearly messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditorYearly|array $value
    * @return \Kendo\UI\SchedulerMessagesRecurrenceEditor
    */
    public function yearly($value) {
        return $this->setProperty('yearly', $value);
    }

//<< Properties
}

?>
