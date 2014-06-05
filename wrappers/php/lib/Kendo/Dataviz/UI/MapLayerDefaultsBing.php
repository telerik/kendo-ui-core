<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsBing extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The attribution of all Bing (tm) layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBing
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * The the opacity of all Bing (tm) tile layers.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBing
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The key of all Bing (tm) tile layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBing
    */
    public function key($value) {
        return $this->setProperty('key', $value);
    }

    /**
    * The bing map tile types. Possible options.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBing
    */
    public function imagerySet($value) {
        return $this->setProperty('imagerySet', $value);
    }

//<< Properties
}

?>
