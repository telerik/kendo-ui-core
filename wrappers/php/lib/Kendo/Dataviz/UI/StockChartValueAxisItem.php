<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function axisCrossingValue($value) {
        return $this->setProperty('axisCrossingValue', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function labels(\Kendo\Dataviz\UI\StockChartValueAxisItemLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function line(\Kendo\Dataviz\UI\StockChartValueAxisItemLine $value) {
        return $this->setProperty('line', $value);
    }

    public function majorGridLines(\Kendo\Dataviz\UI\StockChartValueAxisItemMajorGridLines $value) {
        return $this->setProperty('majorGridLines', $value);
    }

    public function majorTicks(\Kendo\Dataviz\UI\StockChartValueAxisItemMajorTicks $value) {
        return $this->setProperty('majorTicks', $value);
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

    public function minorGridLines(\Kendo\Dataviz\UI\StockChartValueAxisItemMinorGridLines $value) {
        return $this->setProperty('minorGridLines', $value);
    }

    public function minorTicks(\Kendo\Dataviz\UI\StockChartValueAxisItemMinorTicks $value) {
        return $this->setProperty('minorTicks', $value);
    }

    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
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

    public function addPlotBand(\Kendo\Dataviz\UI\StockChartValueAxisItemPlotBand $value) {
        return $this->add('plotBands', $value);
    }

    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    public function title(\Kendo\Dataviz\UI\StockChartValueAxisItemTitle $value) {
        return $this->setProperty('title', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
