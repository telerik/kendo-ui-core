<?php

namespace Kendo\Dataviz\UI;

class StockChart extends \Kendo\UI\Widget {
    protected function name() {
        return 'StockChart';
    }
//>> Properties

    /**
    * The field containing the point date.
It is used as a default categoryField for all series.The data item field value must be either:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function dateField($value) {
        return $this->setProperty('dateField', $value);
    }

    /**
    * The data navigator configuration options.
    * @param \Kendo\Dataviz\UI\StockChartNavigator|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function navigator($value) {
        return $this->setProperty('navigator', $value);
    }

    /**
    * Default options for all chart axes.
    * @param  $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function axisDefaults($value) {
        return $this->setProperty('axisDefaults', $value);
    }

    /**
    * Adds StockChartCategoryAxisItem to the StockChart.
    * @param \Kendo\Dataviz\UI\StockChartCategoryAxisItem|array,... $value one or more StockChartCategoryAxisItem to add.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function addCategoryAxisItem($value) {
        return $this->add('categoryAxis', func_get_args());
    }

    /**
    * The chart area configuration options.
This is the entire visible area of the chart.
    * @param \Kendo\Dataviz\UI\StockChartChartArea|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function chartArea($value) {
        return $this->setProperty('chartArea', $value);
    }

    /**
    * Sets the data source of the StockChart.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Indicates whether the chart will call read on the data source initially.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * The chart legend configuration options.
    * @param \Kendo\Dataviz\UI\StockChartLegend|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function legend($value) {
        return $this->setProperty('legend', $value);
    }

    /**
    * Adds StockChartPane to the StockChart.
    * @param \Kendo\Dataviz\UI\StockChartPane|array,... $value one or more StockChartPane to add.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function addPane($value) {
        return $this->add('panes', func_get_args());
    }

    /**
    * Configures the export settings for the saveAsPDF method.
    * @param \Kendo\Dataviz\UI\StockChartPdf|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function pdf($value) {
        return $this->setProperty('pdf', $value);
    }

    /**
    * The plot area configuration options. This is the area containing the plotted series.
    * @param \Kendo\Dataviz\UI\StockChartPlotArea|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function plotArea($value) {
        return $this->setProperty('plotArea', $value);
    }

    /**
    * Sets the preferred rendering engine.
If it is not supported by the browser, the Chart will switch to the first available mode.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function renderAs($value) {
        return $this->setProperty('renderAs', $value);
    }

    /**
    * Adds StockChartSeriesItem to the StockChart.
    * @param \Kendo\Dataviz\UI\StockChartSeriesItem|array,... $value one or more StockChartSeriesItem to add.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function addSeriesItem($value) {
        return $this->add('series', func_get_args());
    }

    /**
    * The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.
    * @param array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function seriesColors($value) {
        return $this->setProperty('seriesColors', $value);
    }

    /**
    * Default values for each series.
    * @param \Kendo\Dataviz\UI\StockChartSeriesDefaults|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function seriesDefaults($value) {
        return $this->setProperty('seriesDefaults', $value);
    }

    /**
    * Sets Chart theme. Available themes: default, blueOpal, black.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function theme($value) {
        return $this->setProperty('theme', $value);
    }

    /**
    * The chart title configuration options or text.
    * @param \Kendo\Dataviz\UI\StockChartTitle|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\StockChartTooltip|array $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * A value indicating if transition animations should be played.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

    /**
    * Adds StockChartValueAxisItem to the StockChart.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItem|array,... $value one or more StockChartValueAxisItem to add.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function addValueAxisItem($value) {
        return $this->add('valueAxis', func_get_args());
    }

    /**
    * Sets the axisLabelClick event of the StockChart.
    * Fires when an axis label is clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function axisLabelClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('axisLabelClick', $value);
    }

    /**
    * Sets the legendItemClick event of the StockChart.
    * Fires when an legend item is clicked, before the selected series visibility is toggled.
Can be cancelled.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function legendItemClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('legendItemClick', $value);
    }

    /**
    * Sets the legendItemHover event of the StockChart.
    * Fires when an legend item is hovered.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function legendItemHover($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('legendItemHover', $value);
    }

    /**
    * Sets the dataBound event of the StockChart.
    * Fires when the chart has received data from the data source
and is about to render it.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the dragStart event of the StockChart.
    * Fires when the user has used the mouse or a swipe gesture to drag the chart.The drag operation can be aborted by calling e.preventDefault().
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function dragStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragStart', $value);
    }

    /**
    * Sets the drag event of the StockChart.
    * Fires as long as the user is dragging the chart using the mouse or swipe gestures.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function drag($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('drag', $value);
    }

    /**
    * Sets the dragEnd event of the StockChart.
    * Fires when the user stops dragging the chart.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function dragEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragEnd', $value);
    }

    /**
    * Sets the noteClick event of the StockChart.
    * Fired when the user clicks one of the notes.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function noteClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('noteClick', $value);
    }

    /**
    * Sets the noteHover event of the StockChart.
    * Fired when the user hovers one of the notes.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function noteHover($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('noteHover', $value);
    }

    /**
    * Sets the plotAreaClick event of the StockChart.
    * Fires when plot area is clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function plotAreaClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('plotAreaClick', $value);
    }

    /**
    * Sets the render event of the StockChart.
    * Fired when the chart is ready to render on screen.Can be used, for example, to remove loading indicators. Changes to options will be ignored.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function renderEvent($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('render', $value);
    }

    /**
    * Sets the seriesClick event of the StockChart.
    * Fires when chart series are clicked.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function seriesClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('seriesClick', $value);
    }

    /**
    * Sets the seriesHover event of the StockChart.
    * Fires when chart series are hovered.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function seriesHover($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('seriesHover', $value);
    }

    /**
    * Sets the zoomStart event of the StockChart.
    * Fires when the user has used the mousewheel to zoom the chart.The zoom operation can be aborted by calling e.preventDefault().
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function zoomStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomStart', $value);
    }

    /**
    * Sets the zoom event of the StockChart.
    * Fires as long as the user is zooming the chart using the mousewheel.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function zoom($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoom', $value);
    }

    /**
    * Sets the zoomEnd event of the StockChart.
    * Fires when the user stops zooming the chart.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function zoomEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomEnd', $value);
    }

    /**
    * Sets the selectStart event of the StockChart.
    * Fires when the user starts modifying the axis selection.The range units are:
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function selectStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('selectStart', $value);
    }

    /**
    * Sets the select event of the StockChart.
    * Fires when the user modifies the selection.The range units are:
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the selectEnd event of the StockChart.
    * Fires when the user completes modifying the selection.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\StockChart
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
