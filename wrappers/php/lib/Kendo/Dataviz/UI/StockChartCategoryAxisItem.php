<?php

namespace Kendo\Dataviz\UI;

class StockChartCategoryAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function axisCrossingValue($value) {
        return $this->setProperty('axisCrossingValue', $value);
    }

    public function categories($value) {
        return $this->setProperty('categories', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function justified($value) {
        return $this->setProperty('justified', $value);
    }

    public function labels(\Kendo\Dataviz\UI\StockChartCategoryAxisItemLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function line(\Kendo\Dataviz\UI\StockChartCategoryAxisItemLine $value) {
        return $this->setProperty('line', $value);
    }

    public function majorGridLines(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMajorGridLines $value) {
        return $this->setProperty('majorGridLines', $value);
    }

    public function majorTicks(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMajorTicks $value) {
        return $this->setProperty('majorTicks', $value);
    }

    public function minorGridLines(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMinorGridLines $value) {
        return $this->setProperty('minorGridLines', $value);
    }

    public function minorTicks(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMinorTicks $value) {
        return $this->setProperty('minorTicks', $value);
    }

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function pane($value) {
        return $this->setProperty('pane', $value);
    }

    public function addPlotBand(\Kendo\Dataviz\UI\StockChartCategoryAxisItemPlotBand $value) {
        return $this->add('plotBands', $value);
    }

    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    public function title(\Kendo\Dataviz\UI\StockChartCategoryAxisItemTitle $value) {
        return $this->setProperty('title', $value);
    }

    public function type($value) {
        return $this->setProperty('type', $value);
    }

    public function autoBaseUnitSteps($value) {
        return $this->setProperty('autoBaseUnitSteps', $value);
    }

    public function baseUnit($value) {
        return $this->setProperty('baseUnit', $value);
    }

    public function baseUnitStep($value) {
        return $this->setProperty('baseUnitStep', $value);
    }

    public function max($value) {
        return $this->setProperty('max', $value);
    }

    public function min($value) {
        return $this->setProperty('min', $value);
    }

    public function roundToBaseUnit($value) {
        return $this->setProperty('roundToBaseUnit', $value);
    }

    public function weekStartDay($value) {
        return $this->setProperty('weekStartDay', $value);
    }

    public function maxDateGroups($value) {
        return $this->setProperty('maxDateGroups', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
