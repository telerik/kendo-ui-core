<?php

namespace Kendo\UI;

class DateTimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\DateTimePickerAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\DateTimePickerAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
