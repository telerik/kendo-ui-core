<?php

namespace Kendo\Dataviz\UI;

class MapLayerTooltipAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The animation that will be used when a Tooltip closes.
    * @param \Kendo\Dataviz\UI\MapLayerTooltipAnimationClose|array $value
    * @return \Kendo\Dataviz\UI\MapLayerTooltipAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation that will be used when a Tooltip opens.
    * @param \Kendo\Dataviz\UI\MapLayerTooltipAnimationOpen|array $value
    * @return \Kendo\Dataviz\UI\MapLayerTooltipAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
