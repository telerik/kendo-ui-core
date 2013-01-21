<?php

namespace Kendo\Dataviz\UI;

class Chart extends \Kendo\UI\Widget {
    public function name() {
        return 'Chart';
    }
//>> Properties

    public function axisDefaults($value) {
        return $this->setProperty('axisDefaults', $value);
    }

    public function addCategoryAxisItem(\Kendo\Dataviz\UI\ChartCategoryAxisItem $value) {
        return $this->add('categoryAxis', $value);
    }

    public function chartArea(\Kendo\Dataviz\UI\ChartChartArea $value) {
        return $this->setProperty('chartArea', $value);
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    public function legend(\Kendo\Dataviz\UI\ChartLegend $value) {
        return $this->setProperty('legend', $value);
    }

    public function addPane(\Kendo\Dataviz\UI\ChartPane $value) {
        return $this->add('panes', $value);
    }

    public function plotArea(\Kendo\Dataviz\UI\ChartPlotArea $value) {
        return $this->setProperty('plotArea', $value);
    }

    public function addSeriesItem(\Kendo\Dataviz\UI\ChartSeriesItem $value) {
        return $this->add('series', $value);
    }

    public function seriesColors($value) {
        return $this->setProperty('seriesColors', $value);
    }

    public function seriesDefaults(\Kendo\Dataviz\UI\ChartSeriesDefaults $value) {
        return $this->setProperty('seriesDefaults', $value);
    }

    public function theme($value) {
        return $this->setProperty('theme', $value);
    }

    public function title(\Kendo\Dataviz\UI\ChartTitle $value) {
        return $this->setProperty('title', $value);
    }

    public function tooltip(\Kendo\Dataviz\UI\ChartTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

    public function addValueAxisItem(\Kendo\Dataviz\UI\ChartValueAxisItem $value) {
        return $this->add('valueAxis', $value);
    }

    public function addXAxisItem(\Kendo\Dataviz\UI\ChartXAxisItem $value) {
        return $this->add('xAxis', $value);
    }

    public function addYAxisItem(\Kendo\Dataviz\UI\ChartYAxisItem $value) {
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
