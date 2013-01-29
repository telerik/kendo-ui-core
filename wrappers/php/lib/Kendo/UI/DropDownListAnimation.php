<?php

namespace Kendo\UI;

class DropDownListAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Animation to be used for closing of the popup.
    * @param mixed|\Kendo\UI\DropDownListAnimationClose $value
    * @return \Kendo\UI\DropDownListAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * Animation to be used for opening of the popup.
    * @param mixed|\Kendo\UI\DropDownListAnimationOpen $value
    * @return \Kendo\UI\DropDownListAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
