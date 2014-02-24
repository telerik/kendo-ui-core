<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of highlighted points. The color is computed automatically from the base point color.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightBorder|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlight
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The highlight color.** Available only for pie series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlight
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Line options for highlighted points. The color is computed automatically from the base point color.** Available only for candlestick series **
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlightLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlight
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The opacity of the highlighted points.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlight
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * A value indicating if the series points should be highlighted.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlight
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
