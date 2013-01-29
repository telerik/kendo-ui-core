<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemHighlightLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The line color.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the line.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
