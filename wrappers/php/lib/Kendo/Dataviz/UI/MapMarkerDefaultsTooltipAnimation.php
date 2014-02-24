<?php

namespace Kendo\Dataviz\UI;

class MapMarkerDefaultsTooltipAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Tooltip closes.
    * @param \Kendo\Dataviz\UI\MapMarkerDefaultsTooltipAnimationClose|array $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaultsTooltipAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Tooltip opens.
    * @param \Kendo\Dataviz\UI\MapMarkerDefaultsTooltipAnimationOpen|array $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaultsTooltipAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
