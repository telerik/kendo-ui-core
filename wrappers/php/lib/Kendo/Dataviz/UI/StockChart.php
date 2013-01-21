<?php

namespace Kendo\Dataviz\UI;

class StockChart extends \Kendo\UI\Widget {
    public function name() {
        return 'StockChart';
    }
//>> Properties

    public function dateField($value) {
        return $this->setProperty('dateField', $value);
    }

    public function navigator(\Kendo\Dataviz\UI\StockChartNavigator $value) {
        return $this->setProperty('navigator', $value);
    }

    public function axisDefaults($value) {
        return $this->setProperty('axisDefaults', $value);
    }

    public function addCategoryAxisItem(\Kendo\Dataviz\UI\StockChartCategoryAxisItem $value) {
        return $this->add('categoryAxis', $value);
    }

    public function chartArea(\Kendo\Dataviz\UI\StockChartChartArea $value) {
        return $this->setProperty('chartArea', $value);
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    public function legend(\Kendo\Dataviz\UI\StockChartLegend $value) {
        return $this->setProperty('legend', $value);
    }

    public function addPane(\Kendo\Dataviz\UI\StockChartPane $value) {
        return $this->add('panes', $value);
    }

    public function plotArea(\Kendo\Dataviz\UI\StockChartPlotArea $value) {
        return $this->setProperty('plotArea', $value);
    }

    public function addSeriesItem(\Kendo\Dataviz\UI\StockChartSeriesItem $value) {
        return $this->add('series', $value);
    }

    public function seriesColors($value) {
        return $this->setProperty('seriesColors', $value);
    }

    public function seriesDefaults(\Kendo\Dataviz\UI\StockChartSeriesDefaults $value) {
        return $this->setProperty('seriesDefaults', $value);
    }

    public function theme($value) {
        return $this->setProperty('theme', $value);
    }

    public function title(\Kendo\Dataviz\UI\StockChartTitle $value) {
        return $this->setProperty('title', $value);
    }

    public function tooltip(\Kendo\Dataviz\UI\StockChartTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

    public function addValueAxisItem(\Kendo\Dataviz\UI\StockChartValueAxisItem $value) {
        return $this->add('valueAxis', $value);
    }

    public function addXAxisItem(\Kendo\Dataviz\UI\StockChartXAxisItem $value) {
        return $this->add('xAxis', $value);
    }

    public function addYAxisItem(\Kendo\Dataviz\UI\StockChartYAxisItem $value) {
        return $this->add('yAxis', $value);
    }

    public function axisLabelClick($value) {
        return $this->setProperty('axisLabelClick', new \Kendo\JavaScriptFunction($value));
    }

    public function dataBound($value) {
        return $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));
    }

    public function dragStart($value) {
        return $this->setProperty('dragStart', new \Kendo\JavaScriptFunction($value));
    }

    public function drag($value) {
        return $this->setProperty('drag', new \Kendo\JavaScriptFunction($value));
    }

    public function dragEnd($value) {
        return $this->setProperty('dragEnd', new \Kendo\JavaScriptFunction($value));
    }

    public function plotAreaClick($value) {
        return $this->setProperty('plotAreaClick', new \Kendo\JavaScriptFunction($value));
    }

    public function seriesClick($value) {
        return $this->setProperty('seriesClick', new \Kendo\JavaScriptFunction($value));
    }

    public function seriesHover($value) {
        return $this->setProperty('seriesHover', new \Kendo\JavaScriptFunction($value));
    }

    public function zoomStart($value) {
        return $this->setProperty('zoomStart', new \Kendo\JavaScriptFunction($value));
    }

    public function zoom($value) {
        return $this->setProperty('zoom', new \Kendo\JavaScriptFunction($value));
    }

    public function zoomEnd($value) {
        return $this->setProperty('zoomEnd', new \Kendo\JavaScriptFunction($value));
    }

    public function selectStart($value) {
        return $this->setProperty('selectStart', new \Kendo\JavaScriptFunction($value));
    }

    public function select($value) {
        return $this->setProperty('select', new \Kendo\JavaScriptFunction($value));
    }

    public function selectEnd($value) {
        return $this->setProperty('selectEnd', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
