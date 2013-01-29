<?php

namespace Kendo\UI;

class ComboBoxAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Animation to be used for closing of the popup.
    * @param mixed|\Kendo\UI\ComboBoxAnimationClose $value
    * @return \Kendo\UI\ComboBoxAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * Animation to be used for opening of the popup.
    * @param mixed|\Kendo\UI\ComboBoxAnimationOpen $value
    * @return \Kendo\UI\ComboBoxAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
