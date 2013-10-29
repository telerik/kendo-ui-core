<?php

namespace Kendo\UI;

class SchedulerView extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the allDayEventTemplate option of the SchedulerView.
    * The template used to render the "all day" scheduler events.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function allDayEventTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('allDayEventTemplate', $value);
    }

    /**
    * Sets the allDayEventTemplate option of the SchedulerView.
    * The template used to render the "all day" scheduler events.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function allDayEventTemplate($value) {
        return $this->setProperty('allDayEventTemplate', $value);
    }

    /**
    * If set to true the scheduler will display a slot for "all day" events.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerView
    */
    public function allDaySlot($value) {
        return $this->setProperty('allDaySlot', $value);
    }

    /**
    * Sets the allDaySlotTemplate option of the SchedulerView.
    * The template used to render the all day slot cell.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function allDaySlotTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('allDaySlotTemplate', $value);
    }

    /**
    * Sets the allDaySlotTemplate option of the SchedulerView.
    * The template used to render the all day slot cell.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function allDaySlotTemplate($value) {
        return $this->setProperty('allDaySlotTemplate', $value);
    }

    /**
    * Sets the dateHeaderTemplate option of the SchedulerView.
    * The template used to render the date header cells.By default the scheduler renders the date using the current culture date format.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function dateHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('dateHeaderTemplate', $value);
    }

    /**
    * Sets the dateHeaderTemplate option of the SchedulerView.
    * The template used to render the date header cells.By default the scheduler renders the date using the current culture date format.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function dateHeaderTemplate($value) {
        return $this->setProperty('dateHeaderTemplate', $value);
    }

    /**
    * Sets the dayTemplate option of the SchedulerView.
    * The template used to render the day slots in month view.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function dayTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('dayTemplate', $value);
    }

    /**
    * Sets the dayTemplate option of the SchedulerView.
    * The template used to render the day slots in month view.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function dayTemplate($value) {
        return $this->setProperty('dayTemplate', $value);
    }

    /**
    * If set to true the user would be able to create new scheduler events and modify or delete existing ones.Overrides the editable option of the scheduler.
    * @param boolean|\Kendo\UI\SchedulerViewEditable|array $value
    * @return \Kendo\UI\SchedulerView
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * The end time of the view. The scheduler will display events ending before the endTime.
    * @param date $value
    * @return \Kendo\UI\SchedulerView
    */
    public function endTime($value) {
        return $this->setProperty('endTime', $value);
    }

    /**
    * The height of the scheduler event rendered in month view.
    * @param float $value
    * @return \Kendo\UI\SchedulerView
    */
    public function eventHeight($value) {
        return $this->setProperty('eventHeight', $value);
    }

    /**
    * Sets the eventTemplate option of the SchedulerView.
    * The template used by the view to render the scheduler events.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function eventTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('eventTemplate', $value);
    }

    /**
    * Sets the eventTemplate option of the SchedulerView.
    * The template used by the view to render the scheduler events.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function eventTemplate($value) {
        return $this->setProperty('eventTemplate', $value);
    }

    /**
    * Sets the eventTimeTemplate option of the SchedulerView.
    * The template used by the agenda view to render the time of the scheduler events.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function eventTimeTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('eventTimeTemplate', $value);
    }

    /**
    * Sets the eventTimeTemplate option of the SchedulerView.
    * The template used by the agenda view to render the time of the scheduler events.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function eventTimeTemplate($value) {
        return $this->setProperty('eventTimeTemplate', $value);
    }

    /**
    * The configuration of the view resource(s) grouping.
    * @param \Kendo\UI\SchedulerViewGroup|array $value
    * @return \Kendo\UI\SchedulerView
    */
    public function group($value) {
        return $this->setProperty('group', $value);
    }

    /**
    * The number of minutes represented by a major tick.
    * @param float $value
    * @return \Kendo\UI\SchedulerView
    */
    public function majorTick($value) {
        return $this->setProperty('majorTick', $value);
    }

    /**
    * Sets the majorTimeHeaderTemplate option of the SchedulerView.
    * The template used to render the major ticks.By default the scheduler renders the time using the current culture time format.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function majorTimeHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('majorTimeHeaderTemplate', $value);
    }

    /**
    * Sets the majorTimeHeaderTemplate option of the SchedulerView.
    * The template used to render the major ticks.By default the scheduler renders the time using the current culture time format.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function majorTimeHeaderTemplate($value) {
        return $this->setProperty('majorTimeHeaderTemplate', $value);
    }

    /**
    * The number of time slots to display per major tick.
    * @param float $value
    * @return \Kendo\UI\SchedulerView
    */
    public function minorTickCount($value) {
        return $this->setProperty('minorTickCount', $value);
    }

    /**
    * Sets the minorTimeHeaderTemplate option of the SchedulerView.
    * The template used to render the minor ticks.By default the scheduler renders a "&nbsp;".The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function minorTimeHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('minorTimeHeaderTemplate', $value);
    }

    /**
    * Sets the minorTimeHeaderTemplate option of the SchedulerView.
    * The template used to render the minor ticks.By default the scheduler renders a "&nbsp;".The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function minorTimeHeaderTemplate($value) {
        return $this->setProperty('minorTimeHeaderTemplate', $value);
    }

    /**
    * If set to true the view will be initially selected by the scheduler widget.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerView
    */
    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    /**
    * The format used to display the selected date. Uses kendo.format.Contains two placeholders - "{0}" and "{1}" which represent the start and end date displayed by the view.
    * @param string $value
    * @return \Kendo\UI\SchedulerView
    */
    public function selectedDateFormat($value) {
        return $this->setProperty('selectedDateFormat', $value);
    }

    /**
    * If set to true the view will be initially shown in business hours mode. By default view is displyed in full day mode.
    * @param boolean $value
    * @return \Kendo\UI\SchedulerView
    */
    public function showWorkHours($value) {
        return $this->setProperty('showWorkHours', $value);
    }

    /**
    * Sets the slotTemplate option of the SchedulerView.
    * The template used to render the time slot cells.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\SchedulerView
    */
    public function slotTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('slotTemplate', $value);
    }

    /**
    * Sets the slotTemplate option of the SchedulerView.
    * The template used to render the time slot cells.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\SchedulerView
    */
    public function slotTemplate($value) {
        return $this->setProperty('slotTemplate', $value);
    }

    /**
    * The start time of the view. The scheduler will display events starting after the startTime.
    * @param date $value
    * @return \Kendo\UI\SchedulerView
    */
    public function startTime($value) {
        return $this->setProperty('startTime', $value);
    }

    /**
    * The user-friendly title of the view displayed by the scheduler.
    * @param string $value
    * @return \Kendo\UI\SchedulerView
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The type of the view. The built-in views are: "day", "week", "month" and "agenda".
    * @param string $value
    * @return \Kendo\UI\SchedulerView
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The start of working week (index based).
    * @param float $value
    * @return \Kendo\UI\SchedulerView
    */
    public function workWeekStart($value) {
        return $this->setProperty('workWeekStart', $value);
    }

    /**
    * The end of working week (index based).
    * @param float $value
    * @return \Kendo\UI\SchedulerView
    */
    public function workWeekEnd($value) {
        return $this->setProperty('workWeekEnd', $value);
    }

//<< Properties
}

?>
