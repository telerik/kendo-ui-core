<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Adds DiagramConnectionEditableTool to the DiagramConnectionEditable.
    * @param \Kendo\Dataviz\UI\DiagramConnectionEditableTool|array,... $value one or more DiagramConnectionEditableTool to add.
    * @return \Kendo\Dataviz\UI\DiagramConnectionEditable
    */
    public function addTool($value) {
        return $this->add('tools', func_get_args());
    }

//<< Properties
}

?>
