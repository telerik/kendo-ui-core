<?php

namespace Kendo\UI;

class SchedulerMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "all day" displayed in day/week views.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function allDay($value) {
        return $this->setProperty('allDay', $value);
    }

    /**
    * The text similar to "Cancel" displayed in scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    /**
    * The text similar to "Date" displayed in scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function date($value) {
        return $this->setProperty('date', $value);
    }

    /**
    * The text similar to "Delete event" displayed as title of the scheduler delete event window.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function deleteWindowTitle($value) {
        return $this->setProperty('deleteWindowTitle', $value);
    }

    /**
    * The text similar to "Delete" displayed in scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * The text similar to "Event" displayed in scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function event($value) {
        return $this->setProperty('event', $value);
    }

    /**
    * The text similar to "Save" displayed in scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function save($value) {
        return $this->setProperty('save', $value);
    }

    /**
    * The text similar to "Show full day" used in scheduler "showFullDay" button.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function showFullDay($value) {
        return $this->setProperty('showFullDay', $value);
    }

    /**
    * The text similar to "Show business hours" used in scheduler "showWorkDay" button.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function showWorkDay($value) {
        return $this->setProperty('showWorkDay', $value);
    }

    /**
    * The text similar to "Time" displayed in scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function time($value) {
        return $this->setProperty('time', $value);
    }

    /**
    * The text similar to "Today" displayed in scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function today($value) {
        return $this->setProperty('today', $value);
    }

    /**
    * The configuration of the scheduler editor messages. Use this option to customize or localize the scheduler editor messages.
    * @param \Kendo\UI\SchedulerMessagesEditor|array $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function editor($value) {
        return $this->setProperty('editor', $value);
    }

    /**
    * The configuration of the scheduler recurrence editor messages. Use this option to customize or localize the scheduler recurrence editor messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceEditor|array $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function recurrenceEditor($value) {
        return $this->setProperty('recurrenceEditor', $value);
    }

    /**
    * The configuration of the scheduler recurrence messages. Use this option to customize or localize the scheduler recurrence messages.
    * @param \Kendo\UI\SchedulerMessagesRecurrenceMessages|array $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function recurrenceMessages($value) {
        return $this->setProperty('recurrenceMessages', $value);
    }

    /**
    * The configuration of the scheduler views messages. Use this option to customize or localize the scheduler views messages.
    * @param \Kendo\UI\SchedulerMessagesViews|array $value
    * @return \Kendo\UI\SchedulerMessages
    */
    public function views($value) {
        return $this->setProperty('views', $value);
    }

//<< Properties
}

?>
