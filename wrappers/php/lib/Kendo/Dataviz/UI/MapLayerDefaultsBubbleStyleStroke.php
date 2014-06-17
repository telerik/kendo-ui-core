<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsBubbleStyleStroke extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default stroke color for bubble layer symbols.
Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleStroke
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The default dash type for layer symbols.
The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleStroke
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The default stroke opacity (0 to 1) for bubble layer symbols.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleStroke
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The default stroke width for bubble layer symbols.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleStroke
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
