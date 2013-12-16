<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemExtremes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the series outliers.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemExtremes
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the extremes.
    * @param \Kendo\JavaScriptFunction|\Kendo\Dataviz\UI\ChartSeriesItemExtremesBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemExtremes
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The extremes size in pixels.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemExtremes
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The extremes shape.The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemExtremes
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The rotation angle of the extremes.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemExtremes
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

//<< Properties
}

?>
