<?php

namespace Kendo\UI;

class GanttMessagesViews extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Day" displayed as gantt "day" view title.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function day($value) {
        return $this->setProperty('day', $value);
    }

    /**
    * The text similar to "Week" displayed as gantt "week" view title.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function week($value) {
        return $this->setProperty('week', $value);
    }

    /**
    * The text similar to "Month" displayed as gantt "month" view title.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesViews
    */
    public function month($value) {
        return $this->setProperty('month', $value);
    }

//<< Properties
}

?>
