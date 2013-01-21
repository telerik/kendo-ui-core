<?php

namespace Kendo\UI;

class DatePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\DatePickerAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\DatePickerAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
