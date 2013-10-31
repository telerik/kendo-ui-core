<?php

namespace Kendo\UI;

class Scheduler extends \Kendo\UI\Widget {
    public function name() {
        return 'Scheduler';
    }
//>> Properties

    /**
    * Sets the allDayEventTemplate option of the Scheduler.
    * The template used to render the "all day" scheduler events.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Scheduler
    */
    public function allDayEventTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('allDayEventTemplate', $value);
    }

    /**
    * Sets the allDayEventTemplate option of the Scheduler.
    * The template used to render the "all day" scheduler events.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\Scheduler
    */
    public function allDayEventTemplate($value) {
        return $this->setProperty('allDayEventTemplate', $value);
    }

    /**
    * If set to true the scheduler will display a slot for "all day" events.
    * @param boolean $value
    * @return \Kendo\UI\Scheduler
    */
    public function allDaySlot($value) {
        return $this->setProperty('allDaySlot', $value);
    }

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\UI\Scheduler
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Sets the data source of the Scheduler.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\Scheduler
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * The current date of the scheduler. Used to determine the period which is displayed by the widget.
    * @param date $value
    * @return \Kendo\UI\Scheduler
    */
    public function date($value) {
        return $this->setProperty('date', $value);
    }

    /**
    * Sets the dateHeaderTemplate option of the Scheduler.
    * The template used to render the date header cells.By default the scheduler renders the date using the current culture date format.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Scheduler
    */
    public function dateHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('dateHeaderTemplate', $value);
    }

    /**
    * Sets the dateHeaderTemplate option of the Scheduler.
    * The template used to render the date header cells.By default the scheduler renders the date using the current culture date format.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\Scheduler
    */
    public function dateHeaderTemplate($value) {
        return $this->setProperty('dateHeaderTemplate', $value);
    }

    /**
    * If set to true the user would be able to create new scheduler events and modify or delete existing ones.
    * @param boolean|\Kendo\UI\SchedulerEditable|array $value
    * @return \Kendo\UI\Scheduler
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * The end time of the week and day views. The scheduler will display events ending before the endTime.
    * @param date $value
    * @return \Kendo\UI\Scheduler
    */
    public function endTime($value) {
        return $this->setProperty('endTime', $value);
    }

    /**
    * Sets the eventTemplate option of the Scheduler.
    * The template used to render the scheduler events.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Scheduler
    */
    public function eventTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('eventTemplate', $value);
    }

    /**
    * Sets the eventTemplate option of the Scheduler.
    * The template used to render the scheduler events.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\Scheduler
    */
    public function eventTemplate($value) {
        return $this->setProperty('eventTemplate', $value);
    }

    /**
    * If set to false the footer of the scheduler would not be displayed.
    * @param boolean|\Kendo\UI\SchedulerFooter|array $value
    * @return \Kendo\UI\Scheduler
    */
    public function footer($value) {
        return $this->setProperty('footer', $value);
    }

    /**
    * The configuration of the scheduler resource(s) grouping.
    * @param \Kendo\UI\SchedulerGroup|array $value
    * @return \Kendo\UI\Scheduler
    */
    public function group($value) {
        return $this->setProperty('group', $value);
    }

    /**
    * The height of the widget. Numeric values are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\Scheduler
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The number of minutes represented by a major tick.
    * @param float $value
    * @return \Kendo\UI\Scheduler
    */
    public function majorTick($value) {
        return $this->setProperty('majorTick', $value);
    }

    /**
    * Sets the majorTimeHeaderTemplate option of the Scheduler.
    * The template used to render the major ticks.By default the scheduler renders the time using the current culture time format.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Scheduler
    */
    public function majorTimeHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('majorTimeHeaderTemplate', $value);
    }

    /**
    * Sets the majorTimeHeaderTemplate option of the Scheduler.
    * The template used to render the major ticks.By default the scheduler renders the time using the current culture time format.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\Scheduler
    */
    public function majorTimeHeaderTemplate($value) {
        return $this->setProperty('majorTimeHeaderTemplate', $value);
    }

    /**
    * Constraints the maximum date which can be selected via the scheduler navigation.
    * @param date $value
    * @return \Kendo\UI\Scheduler
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The configuration of the scheduler messages. Use this option to customize or localize the scheduler messages.
    * @param \Kendo\UI\SchedulerMessages|array $value
    * @return \Kendo\UI\Scheduler
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * Constraints the minimum date which can be selected via the scheduler navigation.
    * @param date $value
    * @return \Kendo\UI\Scheduler
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The number of time slots to display per major tick.
    * @param float $value
    * @return \Kendo\UI\Scheduler
    */
    public function minorTickCount($value) {
        return $this->setProperty('minorTickCount', $value);
    }

    /**
    * Sets the minorTimeHeaderTemplate option of the Scheduler.
    * The template used to render the minor ticks.By default the scheduler renders a "&nbsp;".The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Scheduler
    */
    public function minorTimeHeaderTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('minorTimeHeaderTemplate', $value);
    }

    /**
    * Sets the minorTimeHeaderTemplate option of the Scheduler.
    * The template used to render the minor ticks.By default the scheduler renders a "&nbsp;".The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\Scheduler
    */
    public function minorTimeHeaderTemplate($value) {
        return $this->setProperty('minorTimeHeaderTemplate', $value);
    }

    /**
    * If set to true and the scheduler is viewed on mobile browser it will use adaptive rendering.Can be set to a string phone or tablet which will force the widget to use adaptive rendering regardless of browser type.
    * @param boolean|string $value
    * @return \Kendo\UI\Scheduler
    */
    public function mobile($value) {
        return $this->setProperty('mobile', $value);
    }

    /**
    * Adds SchedulerResource to the Scheduler.
    * @param \Kendo\UI\SchedulerResource|array,... $value one or more SchedulerResource to add.
    * @return \Kendo\UI\Scheduler
    */
    public function addResource($value) {
        return $this->add('resources', func_get_args());
    }

    /**
    * If set to true the user would be able to select scheduler cells and events. By default selection is disabled.
    * @param boolean $value
    * @return \Kendo\UI\Scheduler
    */
    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    /**
    * If set to true the view will be initially shown in business hours mode. By default view is displyed in full day mode.
    * @param boolean $value
    * @return \Kendo\UI\Scheduler
    */
    public function showWorkHours($value) {
        return $this->setProperty('showWorkHours', $value);
    }

    /**
    * If set to true the scheduler will snap events to the nearest slot during dragging (resizing or moving). Set it to false to allow free moving and resizing of events.
    * @param boolean $value
    * @return \Kendo\UI\Scheduler
    */
    public function snap($value) {
        return $this->setProperty('snap', $value);
    }

    /**
    * The start time of the week and day views. The scheduler will display events starting after the startTime.
    * @param date $value
    * @return \Kendo\UI\Scheduler
    */
    public function startTime($value) {
        return $this->setProperty('startTime', $value);
    }

    /**
    * The timezone which the scheduler will use to display the scheduler appointment dates. By default the current system timezone is used. This is an acceptable default when the
scheduler widget is bound to local array of events. It is advisable to specify a timezone if the scheduler is bound to a remote service.
That way all users would see the same dates and times no matter their configured system timezone.The complete list of the supported timezones is available in the List of IANA time zones Wikipedia page.
    * @param string $value
    * @return \Kendo\UI\Scheduler
    */
    public function timezone($value) {
        return $this->setProperty('timezone', $value);
    }

    /**
    * Adds SchedulerView to the Scheduler.
    * @param \Kendo\UI\SchedulerView|array,... $value one or more SchedulerView to add.
    * @return \Kendo\UI\Scheduler
    */
    public function addView($value) {
        return $this->add('views', func_get_args());
    }

    /**
    * The width of the widget. Numeric values are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\Scheduler
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Sets the start of the work day when the  "Show business hours" button is clicked.
    * @param date $value
    * @return \Kendo\UI\Scheduler
    */
    public function workDayStart($value) {
        return $this->setProperty('workDayStart', $value);
    }

    /**
    * Sets the end of the work day when the  "Show business hours" button is clicked.
    * @param date $value
    * @return \Kendo\UI\Scheduler
    */
    public function workDayEnd($value) {
        return $this->setProperty('workDayEnd', $value);
    }

    /**
    * The start of working week (index based).
    * @param float $value
    * @return \Kendo\UI\Scheduler
    */
    public function workWeekStart($value) {
        return $this->setProperty('workWeekStart', $value);
    }

    /**
    * The end of working week (index based).
    * @param float $value
    * @return \Kendo\UI\Scheduler
    */
    public function workWeekEnd($value) {
        return $this->setProperty('workWeekEnd', $value);
    }

    /**
    * Sets the cancel event of the Scheduler.
    * Fired when the user cancels editing by clicking the "cancel" button.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function cancel($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('cancel', $value);
    }

    /**
    * Sets the change event of the Scheduler.
    * Fired when the user selects a cell or event in the scheduler.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the dataBinding event of the Scheduler.
    * Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function dataBinding($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBinding', $value);
    }

    /**
    * Sets the dataBound event of the Scheduler.
    * Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the edit event of the Scheduler.
    * Fired when the user opens a scheduler event in edit mode by or creates a new event.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function edit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('edit', $value);
    }

    /**
    * Sets the moveStart event of the Scheduler.
    * Fired when the user starts to drag an event.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function moveStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('moveStart', $value);
    }

    /**
    * Sets the move event of the Scheduler.
    * Fired when the user is moving an event.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function move($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('move', $value);
    }

    /**
    * Sets the moveEnd event of the Scheduler.
    * Fired when the user stops moving an event.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function moveEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('moveEnd', $value);
    }

    /**
    * Sets the navigate event of the Scheduler.
    * Fired when the user changes selected date, view or of the schedulerThe event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function navigate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('navigate', $value);
    }

    /**
    * Sets the remove event of the Scheduler.
    * Fired when the user clicks the "destroy" button.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function remove($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('remove', $value);
    }

    /**
    * Sets the resizeStart event of the Scheduler.
    * Fired when the user starts to resize an event.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function resizeStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('resizeStart', $value);
    }

    /**
    * Sets the resize event of the Scheduler.
    * Fired when the user is resizing an event.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function resize($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('resize', $value);
    }

    /**
    * Sets the resizeEnd event of the Scheduler.
    * Fired when the user releases the mouse after resizing an event.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function resizeEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('resizeEnd', $value);
    }

    /**
    * Sets the save event of the Scheduler.
    * Fired when the user saves a scheduler event by clicking the "save" button.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function save($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('save', $value);
    }


//<< Properties
    /**
    * Sets the add event of the Scheduler.
    * Fired when the a new event is about to be added.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Scheduler
    */
    public function addEvent($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('add', $value);
    }
}

?>
