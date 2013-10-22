<?php

namespace Kendo\UI;

class TimePicker extends \Kendo\UI\Widget {
    protected function name() {
        return 'TimePicker';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('input', true);
    }
//>> Properties

    /**
    * Configures the opening and closing animations of the popup. Setting the animation option to false will disable the opening and closing animations. As a result the popup will open and close instantly.
    * @param \Kendo\UI\TimePickerAnimation|array $value
    * @return \Kendo\UI\TimePicker
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Specifies the culture info used by the widget.
    * @param string $value
    * @return \Kendo\UI\TimePicker
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Specifies a list of dates, which are shown in the time drop-down list. If not set, the TimePicker will auto-generate the available times.
    * @param array $value
    * @return \Kendo\UI\TimePicker
    */
    public function dates($value) {
        return $this->setProperty('dates', $value);
    }

    /**
    * Specifies the format, which is used to format the value of the TimePicker displayed in the input. The format also will be used to parse the input.
    * @param string $value
    * @return \Kendo\UI\TimePicker
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Specifies the interval, between values in the popup list, in minutes.
    * @param float $value
    * @return \Kendo\UI\TimePicker
    */
    public function interval($value) {
        return $this->setProperty('interval', $value);
    }

    /**
    * Specifies the end value in the popup list.
    * @param date $value
    * @return \Kendo\UI\TimePicker
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the start value in the popup list.
    * @param date $value
    * @return \Kendo\UI\TimePicker
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Specifies the formats, which are used to parse the value set with the value method or by direct input. If not set the value of the options.format will be used. Note that value of the format option is always used.
    * @param array $value
    * @return \Kendo\UI\TimePicker
    */
    public function parseFormats($value) {
        return $this->setProperty('parseFormats', $value);
    }

    /**
    * Specifies the selected time.
    * @param date $value
    * @return \Kendo\UI\TimePicker
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the TimePicker.
    * Fires when the selected date is changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TimePicker
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the close event of the TimePicker.
    * Fires when the time drop-down list is closed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TimePicker
    */
    public function close($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('close', $value);
    }

    /**
    * Sets the open event of the TimePicker.
    * Fires when the time drop-down list is opened
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\TimePicker
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
