<?php

namespace Kendo\UI;

class MenuAnimationClose extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for closing of the popup.
    * @param string $value
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
