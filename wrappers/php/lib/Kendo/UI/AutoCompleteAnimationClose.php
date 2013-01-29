<?php

namespace Kendo\UI;

class AutoCompleteAnimationClose extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for closing of the popup.
    * @param string $value
    * @returns \Kendo\UI\AutoCompleteAnimationClose
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    * @returns \Kendo\UI\AutoCompleteAnimationClose
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
