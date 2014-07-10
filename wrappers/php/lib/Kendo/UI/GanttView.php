<?php

namespace Kendo\UI;

class GanttView extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the view will be initially selected by the gantt widget. The default selected view is "day".
    * @param boolean $value
    * @return \Kendo\UI\GanttView
    */
    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    /**
    * The size of the time slot headers. Values are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\GanttView
    */
    public function slotSize($value) {
        return $this->setProperty('slotSize', $value);
    }

    /**
    * Sets the timeHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the time slots in "day" view
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GanttView
    */
    public function timeHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('timeHeaderTemplate', $value);
    }

    /**
    * Sets the timeHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the time slots in "day" view
    * @param string $value The template content.
    * @return \Kendo\UI\GanttView
    */
    public function timeHeaderTemplate($value) {
        return $this->setProperty('timeHeaderTemplate', $value);
    }

    /**
    * Sets the dayHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the day slots in "day" and "week" views.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GanttView
    */
    public function dayHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('dayHeaderTemplate', $value);
    }

    /**
    * Sets the dayHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the day slots in "day" and "week" views.
    * @param string $value The template content.
    * @return \Kendo\UI\GanttView
    */
    public function dayHeaderTemplate($value) {
        return $this->setProperty('dayHeaderTemplate', $value);
    }

    /**
    * Sets the weekHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the week slots in "week" and "month" views.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GanttView
    */
    public function weekHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('weekHeaderTemplate', $value);
    }

    /**
    * Sets the weekHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the week slots in "week" and "month" views.
    * @param string $value The template content.
    * @return \Kendo\UI\GanttView
    */
    public function weekHeaderTemplate($value) {
        return $this->setProperty('weekHeaderTemplate', $value);
    }

    /**
    * Sets the monthHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the month slots in "month" views.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GanttView
    */
    public function monthHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('monthHeaderTemplate', $value);
    }

    /**
    * Sets the monthHeaderTemplate option of the GanttView.
    * The [template](/api/framework/kendo#methods-template used to render the month slots in "month" views.
    * @param string $value The template content.
    * @return \Kendo\UI\GanttView
    */
    public function monthHeaderTemplate($value) {
        return $this->setProperty('monthHeaderTemplate', $value);
    }

    /**
    * The view type. Supported types are "day", "week", and "month".
    * @param string $value
    * @return \Kendo\UI\GanttView
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

//<< Properties
}

?>
