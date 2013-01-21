<?php

namespace Kendo\UI;

class TimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\TimePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\TimePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
