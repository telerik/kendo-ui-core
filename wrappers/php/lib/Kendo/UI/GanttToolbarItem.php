<?php

namespace Kendo\UI;

class GanttToolbarItem extends \Kendo\SerializableObject {
    function __construct($name = null) {
        $this->name($name);
    }
//>> Properties

    /**
    * The name of the toolbar command. Either a built-in ("append" and "pdf") or custom. The name is reflected in one of the CSS classes, which is applied to the button - k-gantt-name.
This class can be used to obtain reference to the button after Gantt initialization and attach click handlers.
    * @param string $value
    * @return \Kendo\UI\GanttToolbarItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Sets the template option of the GanttToolbarItem.
    * The template which renders the command. By default renders a button.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GanttToolbarItem
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GanttToolbarItem.
    * The template which renders the command. By default renders a button.
    * @param string $value The template content.
    * @return \Kendo\UI\GanttToolbarItem
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The text displayed by the command button. If not set the name` option would be used as the button text instead.
    * @param string $value
    * @return \Kendo\UI\GanttToolbarItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
