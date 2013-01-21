<?php

namespace Kendo\UI;

class DateTimePickerAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\DateTimePickerAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\DateTimePickerAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
