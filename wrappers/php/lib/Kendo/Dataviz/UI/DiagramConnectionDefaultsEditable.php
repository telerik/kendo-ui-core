<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaultsEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Adds DiagramConnectionDefaultsEditableTool to the DiagramConnectionDefaultsEditable.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsEditableTool|array,... $value one or more DiagramConnectionDefaultsEditableTool to add.
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaultsEditable
    */
    public function addTool($value) {
        return $this->add('tools', func_get_args());
    }

//<< Properties
}

?>
