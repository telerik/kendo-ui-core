<?php

namespace Kendo\UI;

class DateTimePickerAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for opening of the popup.
    * @param string $value
    * @returns \Kendo\UI\DateTimePickerAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    * @returns \Kendo\UI\DateTimePickerAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
