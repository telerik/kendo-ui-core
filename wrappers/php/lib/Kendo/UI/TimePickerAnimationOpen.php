<?php

namespace Kendo\UI;

class TimePickerAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for opening of the popup.
    * @param string $value
    * @returns \Kendo\UI\TimePickerAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    * @returns \Kendo\UI\TimePickerAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
