<?php

namespace Kendo\UI;

class MultiSelectAnimation extends \kendo\SerializableObject {
//>> Properties

    /**
    * Animation to be used for closing of the popup.
    * @param \Kendo\UI\MultiSelectAnimationClose|array $value
    * @return \Kendo\UI\MultiSelectAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * Animation to be used for opening of the popup.
    * @param \Kendo\UI\MultiSelectAnimationOpen|array $value
    * @return \Kendo\UI\MultiSelectAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
