<?php

namespace Kendo\UI;

class WindowAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for opening of the popup.
    * @param string $value
    * @return \Kendo\UI\WindowAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    * @return \Kendo\UI\WindowAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * Whether the effect should play backwards, useful when doing the same animation but with the opposite direction, like opening and closing.
    * @param boolean $value
    * @return \Kendo\UI\WindowAnimationOpen
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

//<< Properties
}

?>
