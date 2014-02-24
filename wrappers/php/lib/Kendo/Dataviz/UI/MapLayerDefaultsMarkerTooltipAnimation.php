<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsMarkerTooltipAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Tooltip closes.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsMarkerTooltipAnimationClose|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarkerTooltipAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Tooltip opens.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsMarkerTooltipAnimationOpen|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarkerTooltipAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
