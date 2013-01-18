<?php

namespace kendo\ui;

class AutoCompleteAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\AutoCompleteAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\AutoCompleteAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
