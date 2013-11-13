<?php

namespace Kendo\UI;

class MenuAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for opening of the popup.
    * @param string $value
    * @return \Kendo\UI\MenuAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Defines the animation duration in milliseconds.
    * @param float $value
    * @return \Kendo\UI\MenuAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
