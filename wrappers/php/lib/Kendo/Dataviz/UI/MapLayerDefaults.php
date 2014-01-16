<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The default configuration for shape layers.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsShape|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaults
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

    /**
    * The default configuration for tile layers.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsTile|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaults
    */
    public function tile($value) {
        return $this->setProperty('tile', $value);
    }

    /**
    * The default configuration for bing layers.
    * @param \Kendo\Dataviz\UI\MapLayerDefaultsBing|array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaults
    */
    public function bing($value) {
        return $this->setProperty('bing', $value);
    }

//<< Properties
}

?>
