<?php

namespace Kendo\UI;

class SchedulerToolbarItem extends \Kendo\SerializableObject {
    function __construct($name = null) {
        $this->name($name);
    }
//>> Properties

    /**
    * The name of the command.
    * @param string $value
    * @return \Kendo\UI\SchedulerToolbarItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

//<< Properties
}

?>
