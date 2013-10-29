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
    * The copyright message for all tile layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayerDefaultsTile
    */
    public function copyright($value) {
        return $this->setProperty('copyright', $value);
    }

//<< Properties
}

?>
