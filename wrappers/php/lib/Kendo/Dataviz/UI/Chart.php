<?php

namespace Kendo\Dataviz\UI;

class Chart extends \Kendo\UI\Widget {
    public function name() {
        return 'Chart';
    }
//>> Properties

    /**
    * Default options for all chart axes.
    * @param Object $value
    */
    public function axisDefaults($value) {
        return $this->setProperty('axisDefaults', $value);
    }

    /**
    * Adds ChartCategoryAxisItem to the Chart.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItem $value
    */
    public function addCategoryAxisItem(\Kendo\Dataviz\UI\ChartCategoryAxisItem $value) {
        return $this->add('categoryAxis', $value);
    }

    /**
    * The chart area configuration options.
This is the entire visible area of the chart.
    * @param \Kendo\Dataviz\UI\ChartArea $value
    */
    public function chartArea(\Kendo\Dataviz\UI\ChartArea $value) {
        return $this->setProperty('chartArea', $value);
    }

    /**
    * Sets the data source of the Chart.
    * @param \Kendo\Data\DataSource $value
    */
    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Indicates whether the chart will call read on the data source initially.
    * @param boolean $value
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * The chart legend configuration options.
    * @param \Kendo\Dataviz\UI\ChartLegend $value
    */
    public function legend(\Kendo\Dataviz\UI\ChartLegend $value) {
        return $this->setProperty('legend', $value);
    }

    /**
    * Adds ChartPane to the Chart.
    * @param \Kendo\Dataviz\UI\ChartPane $value
    */
    public function addPane(\Kendo\Dataviz\UI\ChartPane $value) {
        return $this->add('panes', $value);
    }

    /**
    * The plot area configuration options. This is the area containing the plotted series.
    * @param \Kendo\Dataviz\UI\ChartPlotArea $value
    */
    public function plotArea(\Kendo\Dataviz\UI\ChartPlotArea $value) {
        return $this->setProperty('plotArea', $value);
    }

    /**
    * Adds ChartSeriesItem to the Chart.
    * @param \Kendo\Dataviz\UI\ChartSeriesItem $value
    */
    public function addSeriesItem(\Kendo\Dataviz\UI\ChartSeriesItem $value) {
        return $this->add('series', $value);
    }

    /**
    * The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.
    * @param array $value
    */
    public function seriesColors($value) {
        return $this->setProperty('seriesColors', $value);
    }

    /**
    * Default values for each series.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaults $value
    */
    public function seriesDefaults(\Kendo\Dataviz\UI\ChartSeriesDefaults $value) {
        return $this->setProperty('seriesDefaults', $value);
    }

    /**
    * Sets Chart theme. Available themes: default, blueOpal, black.
    * @param string $value
    */
    public function theme($value) {
        return $this->setProperty('theme', $value);
    }

    /**
    * The chart title configuration options or text.
    * @param \Kendo\Dataviz\UI\ChartTitle $value
    */
    public function title(\Kendo\Dataviz\UI\ChartTitle $value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\ChartTooltip $value
    */
    public function tooltip(\Kendo\Dataviz\UI\ChartTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * A value indicating if transition animations should be played.
    * @param boolean $value
    */
    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

    /**
    * Adds ChartValueAxisItem to the Chart.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItem $value
    */
    public function addValueAxisItem(\Kendo\Dataviz\UI\ChartValueAxisItem $value) {
        return $this->add('valueAxis', $value);
    }

    /**
    * Adds ChartXAxisItem to the Chart.
    * @param \Kendo\Dataviz\UI\ChartXAxisItem $value
    */
    public function addXAxisItem(\Kendo\Dataviz\UI\ChartXAxisItem $value) {
        return $this->add('xAxis', $value);
    }

    /**
    * Adds ChartYAxisItem to the Chart.
    * @param \Kendo\Dataviz\UI\ChartYAxisItem $value
    */
    public function addYAxisItem(\Kendo\Dataviz\UI\ChartYAxisItem $value) {
        return $this->add('yAxis', $value);
    }

    /**
    * Sets the axisLabelClick event of the Chart.
    * Fires when an axis label is clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function axisLabelClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('axisLabelClick', $value);
    }

    /**
    * Sets the dataBound event of the Chart.
    * Fires when the chart has received data from the data source
and is about to render it.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the dragStart event of the Chart.
    * Fires when the user has used the mouse or a swipe gesture to drag the chart.The drag operation can be aborted by calling e.preventDefault().
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function dragStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragStart', $value);
    }

    /**
    * Sets the drag event of the Chart.
    * Fires as long as the user is dragging the chart using the mouse or swipe gestures.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function drag($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('drag', $value);
    }

    /**
    * Sets the dragEnd event of the Chart.
    * Fires when the user stops dragging the chart.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function dragEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragEnd', $value);
    }

    /**
    * Sets the plotAreaClick event of the Chart.
    * Fires when plot area is clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function plotAreaClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('plotAreaClick', $value);
    }

    /**
    * Sets the seriesClick event of the Chart.
    * Fires when chart series are clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function seriesClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('seriesClick', $value);
    }

    /**
    * Sets the seriesHover event of the Chart.
    * Fires when chart series are hovered.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function seriesHover($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('seriesHover', $value);
    }

    /**
    * Sets the zoomStart event of the Chart.
    * Fires when the user has used the mousewheel to zoom the chart.The zoom operation can be aborted by calling e.preventDefault().
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function zoomStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomStart', $value);
    }

    /**
    * Sets the zoom event of the Chart.
    * Fires as long as the user is zooming the chart using the mousewheel.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function zoom($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoom', $value);
    }

    /**
    * Sets the zoomEnd event of the Chart.
    * Fires when the user stops zooming the chart.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function zoomEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomEnd', $value);
    }

    /**
    * Sets the selectStart event of the Chart.
    * Fires when the user start to dragging the drag handle.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function selectStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('selectStart', $value);
    }

    /**
    * Sets the select event of the Chart.
    * Fires when the user drags the drag handle to a new position.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the selectEnd event of the Chart.
    * Fires when the user stops dragging the drag handle.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function selectEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('selectEnd', $value);
    }

//<< Properties
}

?>
