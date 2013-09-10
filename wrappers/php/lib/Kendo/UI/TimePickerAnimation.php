<?php

namespace Kendo\UI;

class TimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation played when the popup is closed.
    * @param \Kendo\UI\TimePickerAnimationClose|array $value
    * @return \Kendo\UI\TimePickerAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation played when the calendar popup is opened.
    * @param \Kendo\UI\TimePickerAnimationOpen|array $value
    * @return \Kendo\UI\TimePickerAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
