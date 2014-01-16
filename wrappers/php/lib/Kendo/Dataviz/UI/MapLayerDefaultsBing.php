<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsBing extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The attribution of all bing layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBing
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * The the opacity of all bing layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBing
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The key of all bing layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsBing
    */
    public function key($value) {
        return $this->setProperty('key', $value);
    }

//<< Properties
}

?>
