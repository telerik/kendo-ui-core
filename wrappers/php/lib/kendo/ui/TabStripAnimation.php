<?php

namespace kendo\ui;

class TabStripAnimation extends \kendo\SerializableObject {
//>> Properties

    public function setClose(\kendo\ui\TabStripAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\kendo\ui\TabStripAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
