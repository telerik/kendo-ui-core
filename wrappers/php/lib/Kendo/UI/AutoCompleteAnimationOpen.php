<?php

namespace Kendo\UI;

class AutoCompleteAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for opening of the popup.
    * @param string $value
    * @returns \Kendo\UI\AutoCompleteAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    * @returns \Kendo\UI\AutoCompleteAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
