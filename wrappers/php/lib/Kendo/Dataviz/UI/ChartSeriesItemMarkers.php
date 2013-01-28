<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemMarkers extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the current series markers.
    * @param string $value
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the markers.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemMarkersBorder $value
    */
    public function border(\Kendo\Dataviz\UI\ChartSeriesItemMarkersBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The marker size.
    * @param float $value
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * Configures the markers shape type.
    * @param string $value
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The markers visibility.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
