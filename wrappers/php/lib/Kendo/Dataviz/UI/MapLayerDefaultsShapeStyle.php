<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsShapeStyle extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default fill for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyleFill|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyle
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * The default stroke for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyleStroke|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyle
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
