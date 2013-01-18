<?php

namespace kendo\ui;

class DatePickerAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\DatePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\DatePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
