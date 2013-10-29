<?php

namespace Kendo\Dataviz\UI;

class MapLayerStyle extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default fill for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.
    * @param \Kendo\Dataviz\UI\MapLayerStyleFill|array $value
    * @return \Kendo\Dataviz\UI\MapLayerStyle
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * The default stroke for layer shapes.
Accepts a valid CSS color string or object with detailed configuration.
    * @param \Kendo\Dataviz\UI\MapLayerStyleStroke|array $value
    * @return \Kendo\Dataviz\UI\MapLayerStyle
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
