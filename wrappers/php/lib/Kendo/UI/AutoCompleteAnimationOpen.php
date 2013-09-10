<?php

namespace Kendo\UI;

class AutoCompleteAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The duration of the open animation in milliseconds.
    * @param float $value
    * @return \Kendo\UI\AutoCompleteAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.Complete list of available animations
    * @param string $value
    * @return \Kendo\UI\AutoCompleteAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

//<< Properties
}

?>
