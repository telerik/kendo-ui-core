<?php

namespace Kendo\Dataviz\UI;

class MapMarkerDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default marker shape. The following pre-defined marker shapes are available:Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-marker-pin-target".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaults
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

    /**
    * Default Kendo UI Tooltip options for this marker.
    * @param \Kendo\Dataviz\UI\MapMarkerDefaultsTooltip|array $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaults
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

//<< Properties
}

?>
