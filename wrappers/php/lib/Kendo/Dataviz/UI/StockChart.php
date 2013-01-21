<?php

namespace Kendo\Dataviz\UI;

class StockChart extends \Kendo\UI\Widget {
    public function name() {
        return 'StockChart';
    }
//>> Properties

    public function setDateField($value) {
        $this->setProperty('dateField', $value);

        return $this;
    }

    public function setNavigator(\Kendo\Dataviz\UI\StockChartNavigator $value) {
        $this->setProperty('navigator', $value);

        return $this;
    }

    public function setAxisDefaults($value) {
        $this->setProperty('axisDefaults', $value);

        return $this;
    }

    public function addCategoryAxisItem(\Kendo\Dataviz\UI\StockChartCategoryAxisItem $value) {
        $values = $this->getProperty('categoryAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('categoryAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setChartArea(\Kendo\Dataviz\UI\StockChartChartArea $value) {
        $this->setProperty('chartArea', $value);

        return $this;
    }

    public function setDataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setAutoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function setLegend(\Kendo\Dataviz\UI\StockChartLegend $value) {
        $this->setProperty('legend', $value);

        return $this;
    }

    public function addPane(\Kendo\Dataviz\UI\StockChartPane $value) {
        $values = $this->getProperty('panes');

        if ($values == null) {
            $values = array();
            $this->setProperty('panes', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setPlotArea(\Kendo\Dataviz\UI\StockChartPlotArea $value) {
        $this->setProperty('plotArea', $value);

        return $this;
    }

    public function addSeriesItem(\Kendo\Dataviz\UI\StockChartSeriesItem $value) {
        $values = $this->getProperty('series');

        if ($values == null) {
            $values = array();
            $this->setProperty('series', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setSeriesColors($value) {
        $this->setProperty('seriesColors', $value);

        return $this;
    }

    public function setSeriesDefaults(\Kendo\Dataviz\UI\StockChartSeriesDefaults $value) {
        $this->setProperty('seriesDefaults', $value);

        return $this;
    }

    public function setTheme($value) {
        $this->setProperty('theme', $value);

        return $this;
    }

    public function setTitle(\Kendo\Dataviz\UI\StockChartTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setTooltip(\Kendo\Dataviz\UI\StockChartTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function setTransitions($value) {
        $this->setProperty('transitions', $value);

        return $this;
    }

    public function addValueAxisItem(\Kendo\Dataviz\UI\StockChartValueAxisItem $value) {
        $values = $this->getProperty('valueAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('valueAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addXAxisItem(\Kendo\Dataviz\UI\StockChartXAxisItem $value) {
        $values = $this->getProperty('xAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('xAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addYAxisItem(\Kendo\Dataviz\UI\StockChartYAxisItem $value) {
        $values = $this->getProperty('yAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('yAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setAxisLabelClick($value) {
        $this->setProperty('axisLabelClick', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragStart($value) {
        $this->setProperty('dragStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDrag($value) {
        $this->setProperty('drag', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragEnd($value) {
        $this->setProperty('dragEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setPlotAreaClick($value) {
        $this->setProperty('plotAreaClick', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSeriesClick($value) {
        $this->setProperty('seriesClick', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSeriesHover($value) {
        $this->setProperty('seriesHover', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setZoomStart($value) {
        $this->setProperty('zoomStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setZoom($value) {
        $this->setProperty('zoom', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setZoomEnd($value) {
        $this->setProperty('zoomEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelectStart($value) {
        $this->setProperty('selectStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelectEnd($value) {
        $this->setProperty('selectEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
