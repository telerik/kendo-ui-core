<?php

namespace Kendo\UI;

class DateTimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation played when a popup is closed.
    * @param \Kendo\UI\DateTimePickerAnimationClose|array $value
    * @return \Kendo\UI\DateTimePickerAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation played when the popup is opened.
    * @param \Kendo\UI\DateTimePickerAnimationOpen|array $value
    * @return \Kendo\UI\DateTimePickerAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
