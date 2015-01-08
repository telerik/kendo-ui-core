<?php

namespace Kendo\UI;

class GanttTooltip extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the template option of the GanttTooltip.
    * The template which renders the tooltip.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GanttTooltip
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GanttTooltip.
    * The template which renders the tooltip.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\GanttTooltip
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * If set to false the gantt will not display the task tooltip. By default the task tooltip is displayed.
    * @param boolean $value
    * @return \Kendo\UI\GanttTooltip
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
