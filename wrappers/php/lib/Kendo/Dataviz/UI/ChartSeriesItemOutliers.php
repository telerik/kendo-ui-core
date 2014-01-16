<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemOutliers extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the series outliers.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemOutliers
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the outliers.
    * @param \Kendo\JavaScriptFunction|\Kendo\Dataviz\UI\ChartSeriesItemOutliersBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemOutliers
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The marker size in pixels.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemOutliers
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The outliers shape.The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemOutliers
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The rotation angle of the outliers.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemOutliers
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

//<< Properties
}

?>
