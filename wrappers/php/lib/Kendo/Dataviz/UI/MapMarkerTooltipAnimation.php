<?php

namespace Kendo\Dataviz\UI;

class MapMarkerTooltipAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Tooltip closes.
    * @param \Kendo\Dataviz\UI\MapMarkerTooltipAnimationClose|array $value
    * @return \Kendo\Dataviz\UI\MapMarkerTooltipAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Tooltip opens.
    * @param \Kendo\Dataviz\UI\MapMarkerTooltipAnimationOpen|array $value
    * @return \Kendo\Dataviz\UI\MapMarkerTooltipAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
