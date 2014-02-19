<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsMarkerTooltipAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Effect to be used for opening of the Tooltip.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarkerTooltipAnimationOpen
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * Defines the animation duration.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarkerTooltipAnimationOpen
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
