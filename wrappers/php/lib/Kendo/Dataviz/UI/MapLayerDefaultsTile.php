<?php

namespace Kendo\Dataviz\UI;

class MapLayerDefaultsTile extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the urlTemplate option of the MapLayerDefaultsTile.
    * The URL template for tile layers. Template variables:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsTile
    */
    public function urlTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('urlTemplate', $value);
    }

    /**
    * Sets the urlTemplate option of the MapLayerDefaultsTile.
    * The URL template for tile layers. Template variables:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsTile
    */
    public function urlTemplate($value) {
        return $this->setProperty('urlTemplate', $value);
    }

    /**
    * The attribution of all tile layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsTile
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * The subdomain of all tile layers.
    * @param array $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsTile
    */
    public function subdomains($value) {
        return $this->setProperty('subdomains', $value);
    }

    /**
    * The the opacity of all tile layers.
    * @param float $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsTile
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
