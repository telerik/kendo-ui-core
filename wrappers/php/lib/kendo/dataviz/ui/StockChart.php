<?php

namespace kendo\dataviz\ui;

class StockChart extends \kendo\ui\Widget {
    public function name() {
        return 'StockChart';
    }
//>> Properties

    public function setDateField($value) {
        $this->setProperty('dateField', $value);

        return $this;
    }

    public function setNavigator(\kendo\dataviz\ui\StockChartNavigator $value) {
        $this->setProperty('navigator', $value);

        return $this;
    }

    public function setAxisDefaults($value) {
        $this->setProperty('axisDefaults', $value);

        return $this;
    }

    public function addCategoryAxisItem(\kendo\dataviz\ui\StockChartCategoryAxisItem $value) {
        $values = $this->getProperty('categoryAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('categoryAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setChartArea(\kendo\dataviz\ui\StockChartChartArea $value) {
        $this->setProperty('chartArea', $value);

        return $this;
    }

    public function setDataSource(\kendo\data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setLegend(\kendo\dataviz\ui\StockChartLegend $value) {
        $this->setProperty('legend', $value);

        return $this;
    }

    public function addPane(\kendo\dataviz\ui\StockChartPane $value) {
        $values = $this->getProperty('panes');

        if ($values == null) {
            $values = array();
            $this->setProperty('panes', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setPlotArea(\kendo\dataviz\ui\StockChartPlotArea $value) {
        $this->setProperty('plotArea', $value);

        return $this;
    }

    public function addSeriesItem(\kendo\dataviz\ui\StockChartSeriesItem $value) {
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

    public function setSeriesDefaults(\kendo\dataviz\ui\StockChartSeriesDefaults $value) {
        $this->setProperty('seriesDefaults', $value);

        return $this;
    }

    public function setTheme($value) {
        $this->setProperty('theme', $value);

        return $this;
    }

    public function setTitle(\kendo\dataviz\ui\StockChartTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setTooltip(\kendo\dataviz\ui\StockChartTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function setTransitions($value) {
        $this->setProperty('transitions', $value);

        return $this;
    }

    public function addValueAxisItem(\kendo\dataviz\ui\StockChartValueAxisItem $value) {
        $values = $this->getProperty('valueAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('valueAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addXAxisItem(\kendo\dataviz\ui\StockChartXAxisItem $value) {
        $values = $this->getProperty('xAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('xAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addYAxisItem(\kendo\dataviz\ui\StockChartYAxisItem $value) {
        $values = $this->getProperty('yAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('yAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

//<< Properties
}

?>
