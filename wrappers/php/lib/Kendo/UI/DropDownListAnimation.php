<?php

namespace Kendo\UI;

class DropDownListAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\DropDownListAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    public function open(\Kendo\UI\DropDownListAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
