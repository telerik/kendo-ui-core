<?php

namespace kendo\ui;

class DropDownListAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\DropDownListAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\DropDownListAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
