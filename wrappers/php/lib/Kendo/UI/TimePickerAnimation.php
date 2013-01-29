<?php

namespace Kendo\UI;

class TimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Animation to be used for closing of the popup.
    * @param mixed|\Kendo\UI\TimePickerAnimationClose $value
    * @return \Kendo\UI\TimePickerAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * Animation to be used for opening of the popup.
    * @param mixed|\Kendo\UI\TimePickerAnimationOpen $value
    * @return \Kendo\UI\TimePickerAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
