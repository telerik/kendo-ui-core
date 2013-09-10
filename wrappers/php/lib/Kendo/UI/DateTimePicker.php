<?php

namespace Kendo\UI;

class DateTimePicker extends \Kendo\UI\Widget {
    protected function name() {
        return 'DateTimePicker';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('input', true);
    }
//>> Properties

    /**
    * Configures the opening and closing animations of the popups. Setting the animation option to false will disable the opening and closing animations. As a result the popup will open and close instantly.
    * @param \Kendo\UI\DateTimePickerAnimation|array $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Sets the ARIATemplate option of the DateTimePicker.
    * Specifies a template used to populate value of the aria-label attribute.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\DateTimePicker
    */
    public function ARIATemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('ARIATemplate', $value);
    }

    /**
    * Sets the ARIATemplate option of the DateTimePicker.
    * Specifies a template used to populate value of the aria-label attribute.
    * @param string $value The template content.
    * @return \Kendo\UI\DateTimePicker
    */
    public function ARIATemplate($value) {
        return $this->setProperty('ARIATemplate', $value);
    }

    /**
    * Specifies the culture info used by the widget.
    * @param string $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Specifies a list of dates, which will be passed to the month template of the DateView. All dates, which match the date portion of the selected date will be used to re-bind the TimeView.
    * @param array $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function dates($value) {
        return $this->setProperty('dates', $value);
    }

    /**
    * Specifies the navigation depth of the calendar. The following
settings are available for the depth value:
    * @param string $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function depth($value) {
        return $this->setProperty('depth', $value);
    }

    /**
    * The template which renders the footer of the calendar. If false, the footer will not be rendered.
    * @param string $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function footer($value) {
        return $this->setProperty('footer', $value);
    }

    /**
    * Specifies the format, which is used to format the value of the DateTimePicker displayed in the input. The format also will be used to parse the input.
    * @param string $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Specifies the interval, between values in the popup list, in minutes.
    * @param float $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function interval($value) {
        return $this->setProperty('interval', $value);
    }

    /**
    * Specifies the maximum date, which the calendar can show.
    * @param date $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the minimum date that the calendar can show.
    * @param date $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Templates for the cells rendered in the calendar "month" view.
    * @param \Kendo\UI\DateTimePickerMonth|array $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function month($value) {
        return $this->setProperty('month', $value);
    }

    /**
    * Specifies the formats, which are used to parse the value set with value() method or by direct input. If not set the value of the options.format and options.timeFormat will be used. Note that value of the format option is always used.
    * @param array $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function parseFormats($value) {
        return $this->setProperty('parseFormats', $value);
    }

    /**
    * Specifies the start view of the calendar.
 The following settings are available for the start value:
    * @param string $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function start($value) {
        return $this->setProperty('start', $value);
    }

    /**
    * Specifies the format, which is used to format the values in the time drop-down list.
    * @param string $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function timeFormat($value) {
        return $this->setProperty('timeFormat', $value);
    }

    /**
    * Specifies the selected value.
    * @param date $value
    * @return \Kendo\UI\DateTimePicker
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the DateTimePicker.
    * Triggered when the underlying value of a DateTimePicker is changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\DateTimePicker
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the close event of the DateTimePicker.
    * Fires when the calendar or the time drop-down list is closed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\DateTimePicker
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the open event of the DateTimePicker.
    * Fires when the calendar or the time drop-down list is opened
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\DateTimePicker
    */
    public function open($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('open', $value);
    }


//<< Properties
}

?>
