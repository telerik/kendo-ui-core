<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The area configuration options.
The default options for all area series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function area($value) {
        return $this->setProperty('area', $value);
    }

    /**
    * The candlestick configuration options.
The default options for all candlestick series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function candlestick($value) {
        return $this->setProperty('candlestick', $value);
    }

    /**
    * The ohlc configuration options.
The default options for all ohlc series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function ohlc($value) {
        return $this->setProperty('ohlc', $value);
    }

    /**
    * The default options for all bar series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function bar($value) {
        return $this->setProperty('bar', $value);
    }

    /**
    * The border of the series.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The bubble configuration options.
The default options for all bubble series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function bubble($value) {
        return $this->setProperty('bubble', $value);
    }

    /**
    * The column configuration options.
The default options for all column series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function column($value) {
        return $this->setProperty('column', $value);
    }

    /**
    * The donut configuration options.
The default options for all donut series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function donut($value) {
        return $this->setProperty('donut', $value);
    }

    /**
    * The distance between category clusters.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    /**
    * Configures the series data labels.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The line configuration options.
The default options for all line series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The effects overlay.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    /**
    * The pie configuration options.
The default options for all pie series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function pie($value) {
        return $this->setProperty('pie', $value);
    }

    /**
    * The scatter configuration options.
The default options for all scatter series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function scatter($value) {
        return $this->setProperty('scatter', $value);
    }

    /**
    * The scatterLine configuration options.
The default options for all scatterLine series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function scatterLine($value) {
        return $this->setProperty('scatterLine', $value);
    }

    /**
    * Space between bars.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    /**
    * A value indicating if the series should be stacked.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsTooltip|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The vertical area configuration options.
The default options for all vertical area series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function verticalArea($value) {
        return $this->setProperty('verticalArea', $value);
    }

    /**
    * The vertical line configuration options.
The default options for all vertical line series. For more details see the series options.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function verticalLine($value) {
        return $this->setProperty('verticalLine', $value);
    }

//<< Properties
}

?>
