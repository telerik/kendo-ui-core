<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLabelsFromBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border. Accepts a valid CSS color string, including hex and rgb.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFromBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the border.The following dash types are supported:
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFromBorder
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFromBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
