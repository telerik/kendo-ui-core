<?php

namespace Kendo\UI;

class DropDownListAnimation extends \Kendo\SerializableObject {
//>> Properties

    public function setClose(\Kendo\UI\DropDownListAnimationClose $value) {
        $this->setProperty('close', $value);

        return $this;
    }

    public function setOpen(\Kendo\UI\DropDownListAnimationOpen $value) {
        $this->setProperty('open', $value);

        return $this;
    }

//<< Properties
}

?>
