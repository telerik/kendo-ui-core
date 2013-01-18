<?php

namespace kendo\ui;

class CalendarMonth extends \kendo\SerializableObject {
//>> Properties

    public function setContent($value) {
        $this->setProperty('content', $value);

        return $this;
    }

    public function setEmpty($value) {
        $this->setProperty('empty', $value);

        return $this;
    }

//<< Properties
}

?>
