<?php

namespace kendo\ui;

class TimePickerAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\TimePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\TimePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
