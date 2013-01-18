<?php

namespace kendo\ui;

class WindowAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\WindowAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\WindowAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
