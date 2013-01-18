<?php

namespace kendo\ui;

class DateTimePickerAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\DateTimePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\DateTimePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
