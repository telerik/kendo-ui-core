<?php

namespace Kendo\UI;

class GanttMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The configuration of the Gantt view messages. Use this option to customize or localize the Gantt view messages.
    * @param \Kendo\UI\GanttMessagesViews|array $value
    * @return \Kendo\UI\GanttMessages
    */
    public function views($value) {
        return $this->setProperty('views', $value);
    }

    /**
    * The configuration of the Gantt action messages. Use this option to customize or localize the Gantt action messages.
    * @param \Kendo\UI\GanttMessagesActions|array $value
    * @return \Kendo\UI\GanttMessages
    */
    public function actions($value) {
        return $this->setProperty('actions', $value);
    }

//<< Properties
}

?>
