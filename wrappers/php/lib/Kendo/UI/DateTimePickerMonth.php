<?php

namespace Kendo\UI;

class DateTimePickerMonth extends \Kendo\SerializableObject {
//>> Properties

    public function content($value) {
        return $this->setProperty('content', $value);
    }

    public function empty($value) {
        return $this->setProperty('empty', $value);
    }

//<< Properties
}

?>
