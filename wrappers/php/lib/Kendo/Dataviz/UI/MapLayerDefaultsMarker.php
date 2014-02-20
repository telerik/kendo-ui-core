<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsMarker extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default Kendo UI Tooltip options for all marker layers.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsMarkerTooltip|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarker
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The the opacity of all marker layers.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarker
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The marker shape. Supported shapes are "pin" and "pinTarget".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarker
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

//<< Properties
}

?>
