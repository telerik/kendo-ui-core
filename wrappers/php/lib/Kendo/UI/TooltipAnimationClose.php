<?php

namespace Kendo\UI;

class TooltipAnimationClose extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for closing of the tooltip.
    * @param string $value
    * @return \Kendo\UI\TooltipAnimationClose
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Defines the animation duration.
    * @param float $value
    * @return \Kendo\UI\TooltipAnimationClose
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
