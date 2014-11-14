<?php

namespace Kendo\UI;

class TreeListMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the text of "No records to display" message when the widget does not show any items.
    * @param string $value
    * @return \Kendo\UI\TreeListMessages
    */
    public function noRows($value) {
        return $this->setProperty('noRows', $value);
    }

    /**
    * Defines the text of "Loading..." message when the widget loads its root-level items.
    * @param string $value
    * @return \Kendo\UI\TreeListMessages
    */
    public function loading($value) {
        return $this->setProperty('loading', $value);
    }

    /**
    * Defines the text of "Request failed." message when the widget fails to load its root-level items.
    * @param string $value
    * @return \Kendo\UI\TreeListMessages
    */
    public function requestFailed($value) {
        return $this->setProperty('requestFailed', $value);
    }

    /**
    * Defines the text of "Retry" message assigned to the button that tries to load root-level items again.
    * @param string $value
    * @return \Kendo\UI\TreeListMessages
    */
    public function retry($value) {
        return $this->setProperty('retry', $value);
    }

    /**
    * Defines the text for the command buttons used across the widget.
    * @param \Kendo\UI\TreeListMessagesCommands|array $value
    * @return \Kendo\UI\TreeListMessages
    */
    public function commands($value) {
        return $this->setProperty('commands', $value);
    }

//<< Properties
}

?>
