<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function axisCrossingValue($value) {
        $this->setProperty('axisCrossingValue', $value);

        return $this;
    }

    public function categories($value) {
        $this->setProperty('categories', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function justified($value) {
        $this->setProperty('justified', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\ChartCategoryAxisItemLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function line(\Kendo\Dataviz\UI\ChartCategoryAxisItemLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function majorGridLines(\Kendo\Dataviz\UI\ChartCategoryAxisItemMajorGridLines $value) {
        $this->setProperty('majorGridLines', $value);

        return $this;
    }

    public function majorTicks(\Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

        return $this;
    }

    public function minorGridLines(\Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines $value) {
        $this->setProperty('minorGridLines', $value);

        return $this;
    }

    public function minorTicks(\Kendo\Dataviz\UI\ChartCategoryAxisItemMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function pane($value) {
        $this->setProperty('pane', $value);

        return $this;
    }

    public function addPlotBand(\Kendo\Dataviz\UI\ChartCategoryAxisItemPlotBand $value) {
        $values = $this->getProperty('plotBands');

        if ($values == null) {
            $values = array();
            $this->setProperty('plotBands', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function reverse($value) {
        $this->setProperty('reverse', $value);

        return $this;
    }

    public function title(\Kendo\Dataviz\UI\ChartCategoryAxisItemTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function type($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function autoBaseUnitSteps($value) {
        $this->setProperty('autoBaseUnitSteps', $value);

        return $this;
    }

    public function baseUnit($value) {
        $this->setProperty('baseUnit', $value);

        return $this;
    }

    public function baseUnitStep($value) {
        $this->setProperty('baseUnitStep', $value);

        return $this;
    }

    public function max($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function min($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function roundToBaseUnit($value) {
        $this->setProperty('roundToBaseUnit', $value);

        return $this;
    }

    public function weekStartDay($value) {
        $this->setProperty('weekStartDay', $value);

        return $this;
    }

    public function maxDateGroups($value) {
        $this->setProperty('maxDateGroups', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
