<?php

namespace Kendo\UI;

class DatePickerMonth extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The template to be used for rendering the cells in "month" view, which are between the min/max range.
    * @param string $value
    * @return \Kendo\UI\DatePickerMonth
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * The template to be used for rendering the cells in the "month" view, which are not in the min/max range.
    * @param string $value
    * @return \Kendo\UI\DatePickerMonth
    */
    public function _empty($value) {
        return $this->setProperty('empty', $value);
    }

//<< Properties
}

?>
