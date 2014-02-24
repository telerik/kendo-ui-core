<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsShapeStyleStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default stroke color for layer shapes.
Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyleStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The default dash type for layer shapes.
The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyleStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The default stroke opacity (0 to 1) for layer shapes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyleStroke
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The default stroke width for layer shapes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyleStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
