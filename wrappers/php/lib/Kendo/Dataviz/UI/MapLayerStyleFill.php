<?php

namespace Kendo\Dataviz\UI;

class MapLayerStyleFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default fill color for layer shapes.
Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerStyleFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The default fill opacity (0 to 1) for layer shapes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerStyleFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
