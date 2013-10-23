<?php

namespace Kendo\UI;

class SchedulerFooter extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the command which will be displayed in the scheduler footer. Currently only "workDay" option is supported. If the option is set  to false, the "workDay" button will be removed from the footer.
    * @param string|boolean $value
    * @return \Kendo\UI\SchedulerFooter
    */
    public function command($value) {
        return $this->setProperty('command', $value);
    }

//<< Properties
}

?>
