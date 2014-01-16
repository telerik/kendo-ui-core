<?php

namespace Kendo\Dataviz\UI;

class MapLayer extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to false the layer will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * The key of the bing layer.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function key($value) {
        return $this->setProperty('key', $value);
    }

    /**
    * Sets the data source of the MapLayer.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * The attribution for the layer. Accepts valid HTML.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * A list of subdomains to use for loading tiles.
Alternating between different subdomains allows more requests to be executed in parallel.
    * @param array $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function subdomains($value) {
        return $this->setProperty('subdomains', $value);
    }

    /**
    * The the opacity for the layer.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The default style for shapes.
    * @param \Kendo\Dataviz\UI\MapLayerStyle|array $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

    /**
    * Sets the urlTemplate option of the MapLayer.
    * The URL template for tile layers. Template variables:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function urlTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('urlTemplate', $value);
    }

    /**
    * Sets the urlTemplate option of the MapLayer.
    * The URL template for tile layers. Template variables:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function urlTemplate($value) {
        return $this->setProperty('urlTemplate', $value);
    }

    /**
    * The layer type. Supported types are "tile" and "shape".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

//<< Properties
}

?>
