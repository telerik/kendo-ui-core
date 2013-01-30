<?php

namespace Kendo\UI;

class TooltipAnimationOpen extends \kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for opening of the Tooltip.
    * @param string $value
    * @return \Kendo\UI\TooltipAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Difines the animation duration.
    * @param float $value
    * @return \Kendo\UI\TooltipAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
