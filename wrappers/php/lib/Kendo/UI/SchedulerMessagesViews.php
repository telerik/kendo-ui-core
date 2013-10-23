<?php

namespace Kendo\UI;

class SchedulerMessagesViews extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Day" displayed as scheduler "day" view title.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesViews
    */
    public function day($value) {
        return $this->setProperty('day', $value);
    }

    /**
    * The text similar to "Week" displayed as scheduler "week" view title.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesViews
    */
    public function week($value) {
        return $this->setProperty('week', $value);
    }

    /**
    * The text similar to "Month" displayed as scheduler "month" view title.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesViews
    */
    public function month($value) {
        return $this->setProperty('month', $value);
    }

    /**
    * The text similar to "Agenda" displayed as scheduler "agenda" view title.
    * @param string $value
    * @return \Kendo\UI\SchedulerMessagesViews
    */
    public function agenda($value) {
        return $this->setProperty('agenda', $value);
    }

//<< Properties
}

?>
