<?php

namespace Kendo\UI;

class SchedulerViewEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the user can create new events. Creating is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerViewEditable
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

    /**
    * If set to true the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerViewEditable
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * If set to true the user can update events. Updating is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerViewEditable
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
