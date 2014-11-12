<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaultsEditableTool extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The name of the tool. The built-in tools are "edit" and "delete". Can be set to a custom value.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaultsEditableTool
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

//<< Properties
}

?>
