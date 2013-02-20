<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemMarkers extends \kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the current series markers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the markers.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemMarkersBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The marker size.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * Configures the markers shape type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The markers visibility.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
