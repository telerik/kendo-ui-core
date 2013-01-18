<?php

namespace kendo\ui;

class MenuAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\MenuAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\MenuAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
