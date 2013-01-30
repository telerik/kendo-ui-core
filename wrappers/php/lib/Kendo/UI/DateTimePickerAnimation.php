<?php

namespace Kendo\UI;

class DateTimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation(s) used for hiding of the pop-up.
    * @param \Kendo\UI\DateTimePickerAnimationClose|array $value
    * @return \Kendo\UI\DateTimePickerAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation(s) used for displaying of the pop-up.
    * @param \Kendo\UI\DateTimePickerAnimationOpen|array $value
    * @return \Kendo\UI\DateTimePickerAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
