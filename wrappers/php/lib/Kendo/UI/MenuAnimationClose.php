<?php

namespace Kendo\UI;

class MenuAnimationClose extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for closing of the popup.
    * @param string $value
    * @return \Kendo\UI\MenuAnimationClose
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Defines the animation duration in milliseconds.
    * @param float $value
    * @return \Kendo\UI\MenuAnimationClose
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
