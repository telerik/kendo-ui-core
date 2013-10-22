<?php

namespace Kendo\UI;

class TooltipAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Tooltip closes.
    * @param \Kendo\UI\TooltipAnimationClose|array $value
    * @return \Kendo\UI\TooltipAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Tooltip opens.
    * @param \Kendo\UI\TooltipAnimationOpen|array $value
    * @return \Kendo\UI\TooltipAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
