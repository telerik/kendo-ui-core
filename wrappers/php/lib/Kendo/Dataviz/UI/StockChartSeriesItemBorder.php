<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border.  It defaults to the color of the current series.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the border.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemBorder
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The border opacity.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemBorder
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The width of the border.
    * @param float|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
