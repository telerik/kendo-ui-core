<?php

namespace Kendo\Dataviz\UI;

class Sparkline extends \Kendo\UI\Widget {
    function __construct($id, $data = null) {
        parent::__construct($id);
        $this->data($data);
    }

    protected function createElement() {
        return new \Kendo\Html\Element('span', true);
    }

    public function name() {
        return 'Sparkline';
    }

//>> Properties

    /**
    * Default options for all chart axes.
    * @param  $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function axisDefaults($value) {
        return $this->setProperty('axisDefaults', $value);
    }

    /**
    * Adds SparklineCategoryAxisItem to the Sparkline.
    * @param \Kendo\Dataviz\UI\SparklineCategoryAxisItem|array,... $value one or more SparklineCategoryAxisItem to add.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function addCategoryAxisItem($value) {
        return $this->add('categoryAxis', func_get_args());
    }

    /**
    * The chart area configuration options.
This is the entire visible area of the chart.
    * @param \Kendo\Dataviz\UI\SparklineChartArea|array $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function chartArea($value) {
        return $this->setProperty('chartArea', $value);
    }

    /**
    * The data for the default sparkline series.Will be discareded if series are supplied.
    * @param array $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * Sets the data source of the Sparkline.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Indicates whether the chart will call read on the data source initially.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * The plot area configuration options. This is the area containing the plotted series.
    * @param \Kendo\Dataviz\UI\SparklinePlotArea|array $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function plotArea($value) {
        return $this->setProperty('plotArea', $value);
    }

    /**
    * The width to allocate for each data point.
    * @param float $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function pointWidth($value) {
        return $this->setProperty('pointWidth', $value);
    }

    /**
    * Sets the preferred rendering engine.
If it is not supported by the browser, the Sparkline will switch to the first available mode.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function renderAs($value) {
        return $this->setProperty('renderAs', $value);
    }

    /**
    * Adds SparklineSeriesItem to the Sparkline.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItem|array,... $value one or more SparklineSeriesItem to add.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function addSeriesItem($value) {
        return $this->add('series', func_get_args());
    }

    /**
    * The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.
    * @param array $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function seriesColors($value) {
        return $this->setProperty('seriesColors', $value);
    }

    /**
    * Default values for each series.
    * @param \Kendo\Dataviz\UI\SparklineSeriesDefaults|array $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function seriesDefaults($value) {
        return $this->setProperty('seriesDefaults', $value);
    }

    /**
    * Sets Chart theme. Available themes: default, blueOpal, black.
    * @param string $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function theme($value) {
        return $this->setProperty('theme', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\SparklineTooltip|array $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * A value indicating if transition animations should be played.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

    /**
    * The default series type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Adds SparklineValueAxisItem to the Sparkline.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItem|array,... $value one or more SparklineValueAxisItem to add.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function addValueAxisItem($value) {
        return $this->add('valueAxis', func_get_args());
    }

    /**
    * Sets the axisLabelClick event of the Sparkline.
    * Fires when an axis label is clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function axisLabelClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('axisLabelClick', $value);
    }

    /**
    * Sets the dataBound event of the Sparkline.
    * Fires when the sparkline has received data from the data source
and is about to render it.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the dragStart event of the Sparkline.
    * Fires when the user has used the mouse or a swipe gesture to drag the sparkline.The drag operation can be aborted by calling e.preventDefault().
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function dragStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragStart', $value);
    }

    /**
    * Sets the drag event of the Sparkline.
    * Fires as long as the user is dragging the sparkline using the mouse or swipe gestures.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function drag($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('drag', $value);
    }

    /**
    * Sets the dragEnd event of the Sparkline.
    * Fires when the user stops dragging the sparkline.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function dragEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragEnd', $value);
    }

    /**
    * Sets the plotAreaClick event of the Sparkline.
    * Fires when plot area is clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function plotAreaClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('plotAreaClick', $value);
    }

    /**
    * Sets the seriesClick event of the Sparkline.
    * Fires when chart series are clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function seriesClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('seriesClick', $value);
    }

    /**
    * Sets the seriesHover event of the Sparkline.
    * Fires when chart series are hovered.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function seriesHover($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('seriesHover', $value);
    }

    /**
    * Sets the zoomStart event of the Sparkline.
    * Fires when the user has used the mousewheel to zoom the chart.The zoom operation can be aborted by calling e.preventDefault().
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function zoomStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomStart', $value);
    }

    /**
    * Sets the zoom event of the Sparkline.
    * Fires as long as the user is zooming the chart using the mousewheel.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function zoom($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoom', $value);
    }

    /**
    * Sets the zoomEnd event of the Sparkline.
    * Fires when the user stops zooming the chart.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Sparkline
    */
    public function zoomEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomEnd', $value);
    }


//<< Properties
}

?>
