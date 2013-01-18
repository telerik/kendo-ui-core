<?php

namespace kendo\dataviz\ui;

class Chart extends \kendo\ui\Widget {
    public function name() {
        return 'Chart';
    }
//>> Properties

    public function setAxisDefaults($value) {
        $this->setProperty('axisDefaults', $value);

        return $this;
    }

    public function addCategoryAxisItem(\kendo\dataviz\ui\ChartCategoryAxisItem $value) {
        $values = $this->getProperty('categoryAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('categoryAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setChartArea(\kendo\dataviz\ui\ChartChartArea $value) {
        $this->setProperty('chartArea', $value);

        return $this;
    }

    public function setDataSource(\kendo\data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setLegend(\kendo\dataviz\ui\ChartLegend $value) {
        $this->setProperty('legend', $value);

        return $this;
    }

    public function addPane(\kendo\dataviz\ui\ChartPane $value) {
        $values = $this->getProperty('panes');

        if ($values == null) {
            $values = array();
            $this->setProperty('panes', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setPlotArea(\kendo\dataviz\ui\ChartPlotArea $value) {
        $this->setProperty('plotArea', $value);

        return $this;
    }

    public function addSeriesItem(\kendo\dataviz\ui\ChartSeriesItem $value) {
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

    public function setSeriesDefaults(\kendo\dataviz\ui\ChartSeriesDefaults $value) {
        $this->setProperty('seriesDefaults', $value);

        return $this;
    }

    public function setTheme($value) {
        $this->setProperty('theme', $value);

        return $this;
    }

    public function setTitle(\kendo\dataviz\ui\ChartTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setTooltip(\kendo\dataviz\ui\ChartTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function setTransitions($value) {
        $this->setProperty('transitions', $value);

        return $this;
    }

    public function addValueAxisItem(\kendo\dataviz\ui\ChartValueAxisItem $value) {
        $values = $this->getProperty('valueAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('valueAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addXAxisItem(\kendo\dataviz\ui\ChartXAxisItem $value) {
        $values = $this->getProperty('xAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('xAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addYAxisItem(\kendo\dataviz\ui\ChartYAxisItem $value) {
        $values = $this->getProperty('yAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('yAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setAxisLabelClick($value) {
        $this->setProperty('axisLabelClick', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDataBound($value) {
        $this->setProperty('dataBound', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragStart($value) {
        $this->setProperty('dragStart', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDrag($value) {
        $this->setProperty('drag', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setDragEnd($value) {
        $this->setProperty('dragEnd', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setPlotAreaClick($value) {
        $this->setProperty('plotAreaClick', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSeriesClick($value) {
        $this->setProperty('seriesClick', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSeriesHover($value) {
        $this->setProperty('seriesHover', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setZoomStart($value) {
        $this->setProperty('zoomStart', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setZoom($value) {
        $this->setProperty('zoom', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setZoomEnd($value) {
        $this->setProperty('zoomEnd', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelectStart($value) {
        $this->setProperty('selectStart', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelect($value) {
        $this->setProperty('select', new \kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSelectEnd($value) {
        $this->setProperty('selectEnd', new \kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
