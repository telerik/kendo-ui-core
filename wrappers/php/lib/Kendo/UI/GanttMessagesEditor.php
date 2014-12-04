<?php

namespace Kendo\UI;

class GanttMessagesEditor extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text similar to "Assign" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function assignButton($value) {
        return $this->setProperty('assignButton', $value);
    }

    /**
    * The text similar to "Task" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function editorTitle($value) {
        return $this->setProperty('editorTitle', $value);
    }

    /**
    * The text similar to "End" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function end($value) {
        return $this->setProperty('end', $value);
    }

    /**
    * The text similar to "Complete" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function percentComplete($value) {
        return $this->setProperty('percentComplete', $value);
    }

    /**
    * The text similar to "Resources" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function resources($value) {
        return $this->setProperty('resources', $value);
    }

    /**
    * The text similar to "Resources" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function resourcesEditorTitle($value) {
        return $this->setProperty('resourcesEditorTitle', $value);
    }

    /**
    * The text similar to "Resources" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function resourcesHeader($value) {
        return $this->setProperty('resourcesHeader', $value);
    }

    /**
    * The text similar to "Start" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function start($value) {
        return $this->setProperty('start', $value);
    }

    /**
    * The text similar to "Title" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The text similar to "Units" displayed in Gantt task editor.
    * @param string $value
    * @return \Kendo\UI\GanttMessagesEditor
    */
    public function unitsHeader($value) {
        return $this->setProperty('unitsHeader', $value);
    }

//<< Properties
}

?>
