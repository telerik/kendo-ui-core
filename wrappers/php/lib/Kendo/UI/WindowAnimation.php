<?php

namespace Kendo\UI;

class WindowAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\WindowAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\WindowAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
