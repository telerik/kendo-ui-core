<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of highlighted points. The color is computed automatically from the base point color.
    * @param \Kendo\Dataviz\UI\StockChartSeriesItemHighlightBorder $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemHighlight
    */
    public function border(\Kendo\Dataviz\UI\StockChartSeriesItemHighlightBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The highlight color.** Available only for pie series **
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemHighlight
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Line options for highlighted points. The color is computed automatically from the base point color.** Available only for candlestick series **
    * @param \Kendo\Dataviz\UI\StockChartSeriesItemHighlightLine $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemHighlight
    */
    public function line(\Kendo\Dataviz\UI\StockChartSeriesItemHighlightLine $value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The opacity of the highlighted points.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesItemHighlight
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
