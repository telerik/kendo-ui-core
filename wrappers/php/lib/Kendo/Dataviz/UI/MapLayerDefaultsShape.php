<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsShape extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The attribution for all shape layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShape
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * The the opacity of all shape layers.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShape
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The default style for shapes.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsShapeStyle|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShape
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

//<< Properties
}

?>
