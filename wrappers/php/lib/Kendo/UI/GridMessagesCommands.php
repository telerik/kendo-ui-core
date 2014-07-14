<?php

namespace Kendo\UI;

class GridMessagesCommands extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the text of "Cancel Changes" button located in the ToolBar of the widget.
    * @param string $value
    * @return \Kendo\UI\GridMessagesCommands
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

    /**
    * Defines the text of "Cancel" button that is rendered in inline or popup editing mode.
    * @param string $value
    * @return \Kendo\UI\GridMessagesCommands
    */
    public function canceledit($value) {
        return $this->setProperty('canceledit', $value);
    }

    /**
    * Defines the text of "Add new record" button located in the ToolBar of the widget.
    * @param string $value
    * @return \Kendo\UI\GridMessagesCommands
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

    /**
    * Defines the text of "Delete" button rendered in inline or popup editing mode.
    * @param string $value
    * @return \Kendo\UI\GridMessagesCommands
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Defines the text of "Edit" button that is rendered in inline or popup editing mode.
    * @param string $value
    * @return \Kendo\UI\GridMessagesCommands
    */
    public function edit($value) {
        return $this->setProperty('edit', $value);
    }

    /**
    * Defines the text of "Save Changes" button located in the ToolBar of the widget.
    * @param string $value
    * @return \Kendo\UI\GridMessagesCommands
    */
    public function save($value) {
        return $this->setProperty('save', $value);
    }

    /**
    * Defines the text of "Update" button that is rendered in inline or popup editing mode.
    * @param string $value
    * @return \Kendo\UI\GridMessagesCommands
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
