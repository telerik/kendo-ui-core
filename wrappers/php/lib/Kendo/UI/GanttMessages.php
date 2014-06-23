<?php

namespace Kendo\UI;

class GanttMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The configuration of the gantt view messages. Use this option to customize or localize the gantt view messages.
    * @param \Kendo\UI\GanttMessagesViews|array $value
    * @return \Kendo\UI\GanttMessages
    */
    public function views($value) {
        return $this->setProperty('views', $value);
    }

    /**
    * The configuration of the gantt action messages. Use this option to customize or localize the gantt action messages.
    * @param \Kendo\UI\GanttMessagesActions|array $value
    * @return \Kendo\UI\GanttMessages
    */
    public function actions($value) {
        return $this->setProperty('actions', $value);
    }

//<< Properties
}

?>
