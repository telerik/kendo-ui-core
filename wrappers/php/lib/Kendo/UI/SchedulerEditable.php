<?php

namespace Kendo\UI;

class SchedulerEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the scheduler will display a confirmation dialog when the user clicks the "destroy" button.Can be set to a string which will be used as the confirmation text.
    * @param boolean|string $value
    * @return \Kendo\UI\SchedulerEditable
    */
    public function confirmation($value) {
        return $this->setProperty('confirmation', $value);
    }

    /**
    * If set to true the user can create new events. Creating is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerEditable
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

    /**
    * If set to true the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerEditable
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * If set to true the scheduler allows event resizing. Dragging the resize handles changes the start or end time of the event.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerEditable
    */
    public function resize($value) {
        return $this->setProperty('resize', $value);
    }

    /**
    * Sets the template option of the SchedulerEditable.
    * The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerEditable
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the SchedulerEditable.
    * The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerEditable
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * If set to true the user can update events. Updating is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerEditable
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
