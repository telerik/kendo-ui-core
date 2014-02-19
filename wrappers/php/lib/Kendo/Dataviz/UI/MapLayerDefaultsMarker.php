<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsMarker extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default marker shape for all marker layers. The following pre-defined marker shapes are available:Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-marker-pin-target".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsMarker
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

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

//<< Properties
}

?>
