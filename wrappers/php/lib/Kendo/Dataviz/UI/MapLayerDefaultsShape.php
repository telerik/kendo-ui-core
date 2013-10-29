<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsShape extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The copyright message for all shape layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsShape
    */
    public function copyright($value) {
        return $this->setProperty('copyright', $value);
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
