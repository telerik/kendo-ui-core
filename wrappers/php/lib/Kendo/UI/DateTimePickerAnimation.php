<?php

namespace Kendo\UI;

class DateTimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\DateTimePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\DateTimePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
