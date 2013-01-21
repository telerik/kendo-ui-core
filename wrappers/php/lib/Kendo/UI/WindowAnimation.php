<?php

namespace Kendo\UI;

class WindowAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\WindowAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\WindowAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
