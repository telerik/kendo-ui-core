<?php

namespace Kendo\UI;

class DropDownListAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Animation to be used for closing of the popup.
    * @param \Kendo\UI\DropDownListAnimationClose $value
    */
    public function close(\Kendo\UI\DropDownListAnimationClose $value) {
        return $this->setProperty('close', $value);
    }

    /**
    * Animation to be used for opening of the popup.
    * @param \Kendo\UI\DropDownListAnimationOpen $value
    */
    public function open(\Kendo\UI\DropDownListAnimationOpen $value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
