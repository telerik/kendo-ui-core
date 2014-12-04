<?php

namespace Kendo\UI;

class GanttMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The configuration of the Gantt action messages. Use this option to customize or localize the Gantt action messages.
    * @param \Kendo\UI\GanttMessagesActions|array $value
    * @return \Kendo\UI\GanttMessages
    */
    public function actions($value) {
        return $this->setProperty('actions', $value);
    }

    /**
    * The text similar to "Cancel" displayed in Gantt.
    * @param string $value
    * @return \Kendo\UI\GanttMessages
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    /**
    * The text similar to "Delete dependency" displayed in Gantt dependency delete dialog.
    * @param string $value
    * @return \Kendo\UI\GanttMessages
    */
    public function deleteDependencyWindowTitle($value) {
        return $this->setProperty('deleteDependencyWindowTitle', $value);
    }

    /**
    * The text similar to "Delete task" displayed in Gantt task delete dialog.
    * @param string $value
    * @return \Kendo\UI\GanttMessages
    */
    public function deleteTaskWindowTitle($value) {
        return $this->setProperty('deleteTaskWindowTitle', $value);
    }

    /**
    * The text similar to "Delete" displayed in Gantt.
    * @param string $value
    * @return \Kendo\UI\GanttMessages
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * The configuration of the Gantt editor messages. Use this option to customize or localize the Gantt editor messages.
    * @param \Kendo\UI\GanttMessagesEditor|array $value
    * @return \Kendo\UI\GanttMessages
    */
    public function editor($value) {
        return $this->setProperty('editor', $value);
    }

    /**
    * The text similar to "Save" displayed in Gantt.
    * @param string $value
    * @return \Kendo\UI\GanttMessages
    */
    public function save($value) {
        return $this->setProperty('save', $value);
    }

    /**
    * The configuration of the Gantt view messages. Use this option to customize or localize the Gantt view messages.
    * @param \Kendo\UI\GanttMessagesViews|array $value
    * @return \Kendo\UI\GanttMessages
    */
    public function views($value) {
        return $this->setProperty('views', $value);
    }

//<< Properties
}

?>
