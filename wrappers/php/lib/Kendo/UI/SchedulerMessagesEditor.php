<?php

namespace Kendo\UI;

class SchedulerMessagesEditor extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "All day event" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function allDayEvent($value) {
        return $this->setProperty('allDayEvent', $value);
    }

    /**
    * The text similar to "Description" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function description($value) {
        return $this->setProperty('description', $value);
    }

    /**
    * The text similar to "Event" displayed as title of the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function editorTitle($value) {
        return $this->setProperty('editorTitle', $value);
    }

    /**
    * The text similar to "End" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function end($value) {
        return $this->setProperty('end', $value);
    }

    /**
    * The text similar to "End timezone" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function endTimezone($value) {
        return $this->setProperty('endTimezone', $value);
    }

    /**
    * The text similar to "Repeat" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function repeat($value) {
        return $this->setProperty('repeat', $value);
    }

    /**
    * The text similar to "Use separate start and end time zones" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function separateTimezones($value) {
        return $this->setProperty('separateTimezones', $value);
    }

    /**
    * The text similar to "Start" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function start($value) {
        return $this->setProperty('start', $value);
    }

    /**
    * The text similar to "Start timezone" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function startTimezone($value) {
        return $this->setProperty('startTimezone', $value);
    }

    /**
    * The text similar to "Timezone" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function timezone($value) {
        return $this->setProperty('timezone', $value);
    }

    /**
    * The text similar to "Time zone" displayed as text of timezone editor button in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function timezoneEditorButton($value) {
        return $this->setProperty('timezoneEditorButton', $value);
    }

    /**
    * The text similar to "Timezones" displayed as title of timezone editor in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function timezoneEditorTitle($value) {
        return $this->setProperty('timezoneEditorTitle', $value);
    }

    /**
    * The text similar to "Title of the event" displayed in the scheduler event editor.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesEditor
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

//<< Properties
}

?>
