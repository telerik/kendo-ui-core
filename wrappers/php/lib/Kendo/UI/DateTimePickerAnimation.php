<?php

namespace Kendo\UI;

class DateTimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation(s) used for hiding of the pop-up.
    * @param \Kendo\UI\DateTimePickerAnimationClose $value
    * @returns \Kendo\UI\DateTimePickerAnimation
    */
    public function close(\Kendo\UI\DateTimePickerAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation(s) used for displaying of the pop-up.
    * @param \Kendo\UI\DateTimePickerAnimationOpen $value
    * @returns \Kendo\UI\DateTimePickerAnimation
    */
    public function open(\Kendo\UI\DateTimePickerAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
