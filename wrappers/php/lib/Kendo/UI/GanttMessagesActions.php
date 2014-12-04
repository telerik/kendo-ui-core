<?php

namespace Kendo\UI;

class GanttMessagesActions extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Add child" displayed as Gantt "add child" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function addChild($value) {
        return $this->setProperty('addChild', $value);
    }

    /**
    * The text similar to "Append" displayed as Gantt "append" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function append($value) {
        return $this->setProperty('append', $value);
    }

    /**
    * The text similar to "Add below" displayed as Gantt "add below" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function insertAfter($value) {
        return $this->setProperty('insertAfter', $value);
    }

    /**
    * The text similar to "Add above" displayed as Gantt "add above" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function insertBefore($value) {
        return $this->setProperty('insertBefore', $value);
    }

    /**
    * The text of "Export to PDF" button of the Gantt toolbar.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function pdf($value) {
        return $this->setProperty('pdf', $value);
    }

//<< Properties
}

?>
