<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The type of the series. Available types:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The dash type of line chart.The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * Array of data items. The data item type can be either a:
    * @param array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The data field containing the high value.** Available for candlestick and ohlc series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function highField($value) {
        return $this->setProperty('highField', $value);
    }

    /**
    * The data field containing the series value.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * The data item field which contains the category name or date.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function categoryField($value) {
        return $this->setProperty('categoryField', $value);
    }

    /**
    * The navigator series name.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Configures the appearance of highlighted points.** Applicable to candlestick and ohlc series. **
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlight|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function highlight($value) {
        return $this->setProperty('highlight', $value);
    }

    /**
    * The aggregate function to apply for date series.This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function aggregate($value) {
        return $this->setProperty('aggregate', $value);
    }

    /**
    * The name of the value axis to use.** Applicable to area, column, line, ohlc and candlestick series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function axis($value) {
        return $this->setProperty('axis', $value);
    }

    /**
    * The border of the points.** Applicable to column, ohlc and candlestick series **
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemBorder|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The data field containing the close value.** Available for candlestick and ohlc series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function closeField($value) {
        return $this->setProperty('closeField', $value);
    }

    /**
    * The series base color. The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The data field containing the point color.** Applicable for column, candlestick and ohlc series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function colorField($value) {
        return $this->setProperty('colorField', $value);
    }

    /**
    * The series color when open value is smoller then close value.** Available for candlestick series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function downColor($value) {
        return $this->setProperty('downColor', $value);
    }

    /**
    * The data field containing the body color.** Available for candlestick series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function downColorField($value) {
        return $this->setProperty('downColorField', $value);
    }

    /**
    * The distance between category clusters.** Applicable for column, candlestick and ohlc series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    /**
    * Configures the series data labels.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Line options.** Applicable to area, candlestick and ohlc series. **
    * @param string|\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The data field containing the low value.** Available for candlestick and ohlc series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function lowField($value) {
        return $this->setProperty('lowField', $value);
    }

    /**
    * Marker options.** Applicable for area and line series. **
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemMarkers|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function markers($value) {
        return $this->setProperty('markers', $value);
    }

    /**
    * The behavior for handling missing values. The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function missingValues($value) {
        return $this->setProperty('missingValues', $value);
    }

    /**
    * The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

    /**
    * The series opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The data field containing the open value.** Available for candlestick and ohlc series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function openField($value) {
        return $this->setProperty('openField', $value);
    }

    /**
    * The effects overlay.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemOverlay|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    /**
    * Space between points as proportion of the point width.Available for column, candlestick and ohlc series.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    /**
    * A boolean value indicating if the series should be stacked.
A string value is interpreted as navigator.series.stack.group.
    * @param boolean|string|\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemStack|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemTooltip|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The line width.** Applicable for line series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItem
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
