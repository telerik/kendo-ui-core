<?php

namespace Kendo\UI;

class TimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\TimePickerAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\TimePickerAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
