<?php

namespace Kendo\Dataviz\UI;

class StockChartCategoryAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function setAxisCrossingValue($value) {
        $this->setProperty('axisCrossingValue', $value);

        return $this;
    }

    public function setCategories($value) {
        $this->setProperty('categories', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setField($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function setJustified($value) {
        $this->setProperty('justified', $value);

        return $this;
    }

    public function setLabels(\Kendo\Dataviz\UI\StockChartCategoryAxisItemLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setLine(\Kendo\Dataviz\UI\StockChartCategoryAxisItemLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setMajorGridLines(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMajorGridLines $value) {
        $this->setProperty('majorGridLines', $value);

        return $this;
    }

    public function setMajorTicks(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

        return $this;
    }

    public function setMinorGridLines(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMinorGridLines $value) {
        $this->setProperty('minorGridLines', $value);

        return $this;
    }

    public function setMinorTicks(\Kendo\Dataviz\UI\StockChartCategoryAxisItemMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function setName($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function setPane($value) {
        $this->setProperty('pane', $value);

        return $this;
    }

    public function addPlotBand(\Kendo\Dataviz\UI\StockChartCategoryAxisItemPlotBand $value) {
        $values = $this->getProperty('plotBands');

        if ($values == null) {
            $values = array();
            $this->setProperty('plotBands', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setReverse($value) {
        $this->setProperty('reverse', $value);

        return $this;
    }

    public function setTitle(\Kendo\Dataviz\UI\StockChartCategoryAxisItemTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setType($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function setAutoBaseUnitSteps($value) {
        $this->setProperty('autoBaseUnitSteps', $value);

        return $this;
    }

    public function setBaseUnit($value) {
        $this->setProperty('baseUnit', $value);

        return $this;
    }

    public function setBaseUnitStep($value) {
        $this->setProperty('baseUnitStep', $value);

        return $this;
    }

    public function setMax($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function setMin($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function setRoundToBaseUnit($value) {
        $this->setProperty('roundToBaseUnit', $value);

        return $this;
    }

    public function setWeekStartDay($value) {
        $this->setProperty('weekStartDay', $value);

        return $this;
    }

    public function setMaxDateGroups($value) {
        $this->setProperty('maxDateGroups', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
