<?php

namespace Kendo\Dataviz\UI;

class MapMarker extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The marker color. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The marker position. Coordinates are listed as [Latitude, Longitude].
You can also use a kendo.dataviz.map.Location instance.
    * @param array $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The marker size in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The marker shape. Supported shapes are "pin" and "circle".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarker
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

//<< Properties
}

?>
