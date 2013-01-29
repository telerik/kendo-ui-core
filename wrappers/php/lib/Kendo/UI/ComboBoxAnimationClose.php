<?php

namespace Kendo\UI;

class ComboBoxAnimationClose extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for closing of the popup.
    * @param string $value
    * @returns \Kendo\UI\ComboBoxAnimationClose
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    * @returns \Kendo\UI\ComboBoxAnimationClose
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
