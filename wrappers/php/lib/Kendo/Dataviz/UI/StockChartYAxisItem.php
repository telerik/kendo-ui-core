<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function type($value) {
        return $this->setProperty('type', $value);
    }

    public function axisCrossingValue($value) {
        return $this->setProperty('axisCrossingValue', $value);
    }

    public function baseUnit($value) {
        return $this->setProperty('baseUnit', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function labels(\Kendo\Dataviz\UI\StockChartYAxisItemLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    public function max($value) {
        return $this->setProperty('max', $value);
    }

    public function min($value) {
        return $this->setProperty('min', $value);
    }

    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    public function line(\Kendo\Dataviz\UI\StockChartYAxisItemLine $value) {
        return $this->setProperty('line', $value);
    }

    public function majorGridLines(\Kendo\Dataviz\UI\StockChartYAxisItemMajorGridLines $value) {
        return $this->setProperty('majorGridLines', $value);
    }

    public function majorTicks(\Kendo\Dataviz\UI\StockChartYAxisItemMajorTicks $value) {
        return $this->setProperty('majorTicks', $value);
    }

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function narrowRange($value) {
        return $this->setProperty('narrowRange', $value);
    }

    public function pane($value) {
        return $this->setProperty('pane', $value);
    }

    public function addPlotBand(\Kendo\Dataviz\UI\StockChartYAxisItemPlotBand $value) {
        return $this->add('plotBands', $value);
    }

    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    public function title(\Kendo\Dataviz\UI\StockChartYAxisItemTitle $value) {
        return $this->setProperty('title', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
