<?php

namespace kendo\ui;

class ComboBoxAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\ComboBoxAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\ComboBoxAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
