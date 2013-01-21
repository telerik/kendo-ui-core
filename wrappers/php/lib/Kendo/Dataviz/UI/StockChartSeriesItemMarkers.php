<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemMarkers extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        return $this->setProperty('background', $value);
    }

    public function border(\Kendo\Dataviz\UI\StockChartSeriesItemMarkersBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function size($value) {
        return $this->setProperty('size', $value);
    }

    public function type($value) {
        return $this->setProperty('type', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
