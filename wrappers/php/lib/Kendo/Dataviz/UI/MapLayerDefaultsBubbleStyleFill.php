<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsBubbleStyleFill extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default fill color for bubble layer symbols.
Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleFill
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The default fill opacity (0 to 1) for layer symbols.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleFill
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
