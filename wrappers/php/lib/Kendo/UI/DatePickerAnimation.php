<?php

namespace Kendo\UI;

class DatePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation played when the calendar popup is closed.
    * @param \Kendo\UI\DatePickerAnimationClose|array $value
    * @return \Kendo\UI\DatePickerAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation played when the calendar popup is opened.
    * @param \Kendo\UI\DatePickerAnimationOpen|array $value
    * @return \Kendo\UI\DatePickerAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
