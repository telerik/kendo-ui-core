<?php

namespace Kendo\UI;

class DatePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\DatePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\DatePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
