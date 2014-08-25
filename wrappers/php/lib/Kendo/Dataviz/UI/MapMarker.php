<?php

namespace Kendo\Dataviz\UI;

class MapMarker extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The marker location on the map. Coordinates are listed as [Latitude, Longitude].
    * @param array| $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function location($value) {
        return $this->setProperty('location', $value);
    }

    /**
    * The marker title. Displayed as browser tooltip.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * Kendo UI Tooltip options for this marker.
    * @param \Kendo\Dataviz\UI\MapMarkerTooltip|array $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The marker shape. Supported shapes are "pin" and "pinTarget".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

//<< Properties
}

?>
