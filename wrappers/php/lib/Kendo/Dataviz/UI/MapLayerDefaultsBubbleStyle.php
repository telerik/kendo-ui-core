<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsBubbleStyle extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default fill for bubble layer symbols.
Accepts a valid CSS color string or object with detailed configuration.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleFill|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyle
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * The default stroke for bubble layer symbols.
Accepts a valid CSS color string or object with detailed configuration.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyleStroke|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyle
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
