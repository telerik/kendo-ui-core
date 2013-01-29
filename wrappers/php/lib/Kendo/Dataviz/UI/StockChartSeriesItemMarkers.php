<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemMarkers extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the current series markers.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemMarkers
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the markers.
    * @param \Kendo\Dataviz\UI\StockChartSeriesItemMarkersBorder $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemMarkers
    */
    public function border(\Kendo\Dataviz\UI\StockChartSeriesItemMarkersBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The marker size.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemMarkers
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * Configures the markers shape type.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemMarkers
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The markers visibility.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemMarkers
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
