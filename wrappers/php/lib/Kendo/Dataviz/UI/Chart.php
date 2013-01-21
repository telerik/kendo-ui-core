<?php

namespace Kendo\Dataviz\UI;

class Chart extends \Kendo\UI\Widget {
    public function name() {
        return 'Chart';
    }
//>> Properties

    public function axisDefaults($value) {
        $this->setProperty('axisDefaults', $value);

        return $this;
    }

    public function addCategoryAxisItem(\Kendo\Dataviz\UI\ChartCategoryAxisItem $value) {
        $values = $this->getProperty('categoryAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('categoryAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function chartArea(\Kendo\Dataviz\UI\ChartChartArea $value) {
        $this->setProperty('chartArea', $value);

        return $this;
    }

    public function dataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function autoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function legend(\Kendo\Dataviz\UI\ChartLegend $value) {
        $this->setProperty('legend', $value);

        return $this;
    }

    public function addPane(\Kendo\Dataviz\UI\ChartPane $value) {
        $values = $this->getProperty('panes');

        if ($values == null) {
            $values = array();
            $this->setProperty('panes', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function plotArea(\Kendo\Dataviz\UI\ChartPlotArea $value) {
        $this->setProperty('plotArea', $value);

        return $this;
    }

    public function addSeriesItem(\Kendo\Dataviz\UI\ChartSeriesItem $value) {
        $values = $this->getProperty('series');

        if ($values == null) {
            $values = array();
            $this->setProperty('series', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function seriesColors($value) {
        $this->setProperty('seriesColors', $value);

        return $this;
    }

    public function seriesDefaults(\Kendo\Dataviz\UI\ChartSeriesDefaults $value) {
        $this->setProperty('seriesDefaults', $value);

        return $this;
    }

    public function theme($value) {
        $this->setProperty('theme', $value);

        return $this;
    }

    public function title(\Kendo\Dataviz\UI\ChartTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function tooltip(\Kendo\Dataviz\UI\ChartTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function transitions($value) {
        $this->setProperty('transitions', $value);

        return $this;
    }

    public function addValueAxisItem(\Kendo\Dataviz\UI\ChartValueAxisItem $value) {
        $values = $this->getProperty('valueAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('valueAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addXAxisItem(\Kendo\Dataviz\UI\ChartXAxisItem $value) {
        $values = $this->getProperty('xAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('xAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addYAxisItem(\Kendo\Dataviz\UI\ChartYAxisItem $value) {
        $values = $this->getProperty('yAxis');

        if ($values == null) {
            $values = array();
            $this->setProperty('yAxis', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function axisLabelClick($value) {
        $this->setProperty('axisLabelClick', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dataBound($value) {
        $this->setProperty('dataBound', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dragStart($value) {
        $this->setProperty('dragStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function drag($value) {
        $this->setProperty('drag', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function dragEnd($value) {
        $this->setProperty('dragEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function plotAreaClick($value) {
        $this->setProperty('plotAreaClick', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function seriesClick($value) {
        $this->setProperty('seriesClick', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function seriesHover($value) {
        $this->setProperty('seriesHover', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function zoomStart($value) {
        $this->setProperty('zoomStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function zoom($value) {
        $this->setProperty('zoom', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function zoomEnd($value) {
        $this->setProperty('zoomEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function selectStart($value) {
        $this->setProperty('selectStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function select($value) {
        $this->setProperty('select', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function selectEnd($value) {
        $this->setProperty('selectEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
