<?php

namespace Kendo\Dataviz\UI;

class MapMarkerDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default marker color. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaults
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The default marker size in pixels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaults
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The default marker shape. Supported shapes:
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarkerDefaults
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

//<< Properties
}

?>
