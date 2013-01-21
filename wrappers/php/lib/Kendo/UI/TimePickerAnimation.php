<?php

namespace Kendo\UI;

class TimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\TimePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\TimePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
