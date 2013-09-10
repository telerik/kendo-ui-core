<?php

namespace Kendo\UI;

class Calendar extends \Kendo\UI\Widget {
    protected function name() {
        return 'Calendar';
    }
//>> Properties

    /**
    * Specifies the culture info used by the widget.
    * @param string $value
    * @return \Kendo\UI\Calendar
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Specifies a list of dates, which will be passed to the month template.
    * @param array $value
    * @return \Kendo\UI\Calendar
    */
    public function dates($value) {
        return $this->setProperty('dates', $value);
    }

    /**
    * Specifies the navigation depth. The following
settings are available for the depth value:
    * @param string $value
    * @return \Kendo\UI\Calendar
    */
    public function depth($value) {
        return $this->setProperty('depth', $value);
    }

    /**
    * The template which renders the footer. If false, the footer will not be rendered.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\Calendar
    */
    public function footer($value) {
        return $this->setProperty('footer', $value);
    }

    /**
    * Specifies the format, which is used to parse value set with value() method.
    * @param string $value
    * @return \Kendo\UI\Calendar
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Specifies the maximum date, which the calendar can show.
    * @param date $value
    * @return \Kendo\UI\Calendar
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the minimum date, which the calendar can show.
    * @param date $value
    * @return \Kendo\UI\Calendar
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Templates for the cells rendered in "month" view.
    * @param \Kendo\UI\CalendarMonth|array $value
    * @return \Kendo\UI\Calendar
    */
    public function month($value) {
        return $this->setProperty('month', $value);
    }

    /**
    * Specifies the start view.
The following settings are available for the start value:
    * @param string $value
    * @return \Kendo\UI\Calendar
    */
    public function start($value) {
        return $this->setProperty('start', $value);
    }

    /**
    * Specifies the selected date.
    * @param date $value
    * @return \Kendo\UI\Calendar
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the Calendar.
    * Fires when the selected date is changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Calendar
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the navigate event of the Calendar.
    * Fires when calendar navigates.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Calendar
    */
    public function navigate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('navigate', $value);
    }


//<< Properties
}

?>
