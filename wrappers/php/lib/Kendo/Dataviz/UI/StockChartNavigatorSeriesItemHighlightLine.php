<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemHighlightLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The line color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the line.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
