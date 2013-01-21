<?php

namespace Kendo\UI;

class DatePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\DatePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\DatePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
