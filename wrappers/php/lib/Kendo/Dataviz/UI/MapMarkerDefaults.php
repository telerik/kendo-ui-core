<?php

namespace Kendo\Dataviz\UI;

class MapMarkerDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Default Kendo UI Tooltip options for this marker.
    * @param \Kendo\Dataviz\UI\MapMarkerDefaultsTooltip|array $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaults
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The default marker shape. Supported shapes are "pin" and "pinTarget".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaults
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

//<< Properties
}

?>
