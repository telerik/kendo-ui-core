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
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Specifies a list of dates, which will be passed to the month template.
    * @param array $value
    */
    public function dates($value) {
        return $this->setProperty('dates', $value);
    }

    /**
    * Specifies the navigation depth.
    * @param string $value
    */
    public function depth($value) {
        return $this->setProperty('depth', $value);
    }

    /**
    * Template to be used for rendering the footer. If false, the footer will not be rendered.
    * @param string $value
    */
    public function footer($value) {
        return $this->setProperty('footer', $value);
    }

    /**
    * Specifies the format, which is used to parse value set with value() method.
    * @param string $value
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Specifies the maximum date, which the calendar can show.
    * @param date $value
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the minimum date, which the calendar can show.
    * @param date $value
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Templates for the cells rendered in the "month" view.
    * @param \Kendo\UI\CalendarMonth $value
    */
    public function month(\Kendo\UI\CalendarMonth $value) {
        return $this->setProperty('month', $value);
    }

    /**
    * Specifies the start view.
    * @param string $value
    */
    public function start($value) {
        return $this->setProperty('start', $value);
    }

    /**
    * Specifies the selected date.
    * @param date $value
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the Calendar.
    * Fires when the selected date is changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the navigate event of the Calendar.
    * Fires when navigate
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
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
