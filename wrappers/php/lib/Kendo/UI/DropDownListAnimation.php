<?php

namespace Kendo\UI;

class DropDownListAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Animation to be used for closing of the popup.
    * @param \Kendo\UI\DropDownListAnimationClose|array $value
    * @return \Kendo\UI\DropDownListAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * Animation to be used for opening of the popup.
    * @param \Kendo\UI\DropDownListAnimationOpen|array $value
    * @return \Kendo\UI\DropDownListAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
