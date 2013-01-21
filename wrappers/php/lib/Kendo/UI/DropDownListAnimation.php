<?php

namespace Kendo\UI;

class DropDownListAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function close(\Kendo\UI\DropDownListAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function open(\Kendo\UI\DropDownListAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
