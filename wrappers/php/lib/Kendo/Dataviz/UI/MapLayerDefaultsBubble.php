<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsBubble extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The attribution for all bubble layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubble
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * The the opacity of all bubble layers.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubble
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The maximum symbol size for bubble layer symbols.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubble
    */
    public function maxSize($value) {
        return $this->setProperty('maxSize', $value);
    }

    /**
    * The minimum symbol size for bubble layer symbols.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubble
    */
    public function minSize($value) {
        return $this->setProperty('minSize', $value);
    }

    /**
    * The default style for bubble layer symbols.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsBubbleStyle|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubble
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

    /**
    * The bubble layer symbol type. Supported symbols are "circle" and "square".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBubble
    */
    public function symbol($value) {
        return $this->setProperty('symbol', $value);
    }

//<< Properties
}

?>
