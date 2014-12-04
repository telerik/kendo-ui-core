<?php

namespace Kendo\UI;

class GanttMessagesViews extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Day" displayed as Gantt "day" view title.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function day($value) {
        return $this->setProperty('day', $value);
    }

    /**
    * The text similar to "End" displayed in Gantt resize hint.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function end($value) {
        return $this->setProperty('end', $value);
    }

    /**
    * The text similar to "Month" displayed as Gantt "month" view title.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function month($value) {
        return $this->setProperty('month', $value);
    }

    /**
    * The text similar to "Start" displayed in Gantt resize hint.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function start($value) {
        return $this->setProperty('start', $value);
    }

    /**
    * The text similar to "Week" displayed as Gantt "week" view title.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function week($value) {
        return $this->setProperty('week', $value);
    }

    /**
    * The text similar to "Year" displayed as Gantt "year" view title.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function year($value) {
        return $this->setProperty('year', $value);
    }

//<< Properties
}

?>
