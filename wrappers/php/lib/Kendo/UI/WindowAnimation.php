<?php

namespace Kendo\UI;

class WindowAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\WindowAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\WindowAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
