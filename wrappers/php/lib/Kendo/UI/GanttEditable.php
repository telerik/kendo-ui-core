<?php

namespace Kendo\UI;

class GanttEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the Gantt will display a confirmation dialog when the user deletes a task or a dependency.
    * @param boolean $value
    * @return \Kendo\UI\GanttEditable
    */
    public function confirmation($value) {
        return $this->setProperty('confirmation', $value);
    }

    /**
    * Sets the template option of the GanttEditable.
    * The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GanttEditable
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GanttEditable.
    * The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The template content.
    * @return \Kendo\UI\GanttEditable
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
