<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The area chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function area($value) {
        return $this->setProperty('area', $value);
    }

    /**
    * The bar chart series options. Accepts all values supported by the series option.
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
    * The bubble chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function bubble($value) {
        return $this->setProperty('bubble', $value);
    }

    /**
    * The candlestick chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function candlestick($value) {
        return $this->setProperty('candlestick', $value);
    }

    /**
    * The column chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function column($value) {
        return $this->setProperty('column', $value);
    }

    /**
    * The donut chart series options. Accepts all values supported by the series option.
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
    * The chart series label configuration.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The line chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The ohlc chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function ohlc($value) {
        return $this->setProperty('ohlc', $value);
    }

    /**
    * The chart series overlay options.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsOverlay|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    /**
    * The pie chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function pie($value) {
        return $this->setProperty('pie', $value);
    }

    /**
    * The scatter chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function scatter($value) {
        return $this->setProperty('scatter', $value);
    }

    /**
    * The scatterLine chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function scatterLine($value) {
        return $this->setProperty('scatterLine', $value);
    }

    /**
    * The space between the chart series as proportion of the series width.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    /**
    * A boolean value indicating if the series should be stacked.
    * @param boolean|\Kendo\Dataviz\UI\ChartSeriesDefaultsStack|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    /**
    * The default type of the series.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The chart series tooltip configuration options.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsTooltip|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The verticalArea chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function verticalArea($value) {
        return $this->setProperty('verticalArea', $value);
    }

    /**
    * The verticalLine chart series options. Accepts all values supported by the series option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function verticalLine($value) {
        return $this->setProperty('verticalLine', $value);
    }

    /**
    * The seriesDefaults notes configuration.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsNotes|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaults
    */
    public function notes($value) {
        return $this->setProperty('notes', $value);
    }

//<< Properties
}

?>
