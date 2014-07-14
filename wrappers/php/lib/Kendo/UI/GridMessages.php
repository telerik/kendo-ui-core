<?php

namespace Kendo\UI;

class GridMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the text of the command buttons that are shown within the Grid. Used primarily for localization.
    * @param \Kendo\UI\GridMessagesCommands|array $value
    * @return \Kendo\UI\GridMessages
    */
    public function commands($value) {
        return $this->setProperty('commands', $value);
    }

//<< Properties
}

?>
