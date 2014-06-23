<?php

namespace Kendo\UI;

class GanttMessagesActions extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Append" displayed as gantt "append" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function append($value) {
        return $this->setProperty('append', $value);
    }

    /**
    * The text similar to "Add child" displayed as gantt "add child" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function addChild($value) {
        return $this->setProperty('addChild', $value);
    }

    /**
    * The text similar to "Add above" displayed as gantt "add above" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function insertBefore($value) {
        return $this->setProperty('insertBefore', $value);
    }

    /**
    * The text similar to "Add below" displayed as gantt "add below" buttons.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesActions
    */
    public function insertAfter($value) {
        return $this->setProperty('insertAfter', $value);
    }

//<< Properties
}

?>
