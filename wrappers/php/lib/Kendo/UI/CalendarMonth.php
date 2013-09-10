<?php

namespace Kendo\UI;

class CalendarMonth extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The template to be used for rendering the cells in "month" view, which are between the min/max range.
 By default, the widget renders the value of the corresponding day.
    * @param string $value
    * @return \Kendo\UI\CalendarMonth
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * The template to be used for rendering the cells in the "month" view, which are not in the min/max range.
 By default, the widget renders an empty string.
    * @param string $value
    * @return \Kendo\UI\CalendarMonth
    */
    public function _empty($value) {
        return $this->setProperty('empty', $value);
    }

//<< Properties
}

?>
