<?php

namespace Kendo\UI;

class DatePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation(s) used for hiding of the pop-up.
    * @param mixed|\Kendo\UI\DatePickerAnimationClose $value
    * @return \Kendo\UI\DatePickerAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation(s) used for displaying of the pop-up.
    * @param mixed|\Kendo\UI\DatePickerAnimationOpen $value
    * @return \Kendo\UI\DatePickerAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
