<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemMarkers extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the current series markers.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the markers.
    * @param \Kendo\JavaScriptFunction|\Kendo\Dataviz\UI\SparklineSeriesItemMarkersBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The marker size.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * Configures the markers shape type.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The markers visibility.
    * @param boolean|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The rotation angle of the markers.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemMarkers
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

//<< Properties
}

?>
