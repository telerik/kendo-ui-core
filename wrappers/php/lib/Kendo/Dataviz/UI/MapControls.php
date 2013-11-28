<?php

namespace Kendo\Dataviz\UI;

class MapControls extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Enables or disables the built-in attribution control.
    * @param boolean|\Kendo\Dataviz\UI\MapControlsAttribution|array $value
    * @return \Kendo\Dataviz\UI\MapControls
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * Enables or disables the built-in navigator control (directional pad).
    * @param boolean|\Kendo\Dataviz\UI\MapControlsNavigator|array $value
    * @return \Kendo\Dataviz\UI\MapControls
    */
    public function navigator($value) {
        return $this->setProperty('navigator', $value);
    }

    /**
    * Enables or disables the built-in zoom control (+/- button).
    * @param boolean|\Kendo\Dataviz\UI\MapControlsZoom|array $value
    * @return \Kendo\Dataviz\UI\MapControls
    */
    public function zoom($value) {
        return $this->setProperty('zoom', $value);
    }

//<< Properties
}

?>
