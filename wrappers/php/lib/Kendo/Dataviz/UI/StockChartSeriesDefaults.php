<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The area configuration options.
The default options for all area series. For more details see the series options.
    * @param Object $value
    */
    public function area($value) {
        return $this->setProperty('area', $value);
    }

    /**
    * The candlestick configuration options.
The default options for all candlestick series. For more details see the series options.
    * @param Object $value
    */
    public function candlestick($value) {
        return $this->setProperty('candlestick', $value);
    }

    /**
    * The ohlc configuration options.
The default options for all ohlc series. For more details see the series options.
    * @param Object $value
    */
    public function ohlc($value) {
        return $this->setProperty('ohlc', $value);
    }

    /**
    * The border of the series.
    * @param \Kendo\Dataviz\UI\StockChartSeriesDefaultsBorder $value
    */
    public function border(\Kendo\Dataviz\UI\StockChartSeriesDefaultsBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The column configuration options.
The default options for all column series. For more details see the series options.
    * @param Object $value
    */
    public function column($value) {
        return $this->setProperty('column', $value);
    }

    /**
    * The distance between category clusters.
    * @param float $value
    */
    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    /**
    * Configures the series data labels.
    * @param \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels $value
    */
    public function labels(\Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels $value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The line configuration options.
The default options for all line series. For more details see the series options.
    * @param Object $value
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The effects overlay.
    * @param Object $value
    */
    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    /**
    * The pie configuration options.
The default options for all pie series. For more details see the series options.
    * @param Object $value
    */
    public function pie($value) {
        return $this->setProperty('pie', $value);
    }

    /**
    * Space between bars.
    * @param float $value
    */
    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    /**
    * A value indicating if the series should be stacked.
    * @param boolean $value
    */
    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\StockChartSeriesDefaultsTooltip $value
    */
    public function tooltip(\Kendo\Dataviz\UI\StockChartSeriesDefaultsTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

//<< Properties
}

?>
