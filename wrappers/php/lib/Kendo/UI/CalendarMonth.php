<?php

namespace Kendo\UI;

class CalendarMonth extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Template to be used for rendering the cells in the "month" view, which are in range.
    * @param string $value
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Template to be used for rendering the cells in the "month" view, which are not in the min/max range.
    * @param string $value
    */
    public function _empty($value) {
        return $this->setProperty('empty', $value);
    }

//<< Properties
}

?>
