<?php

namespace Kendo\Dataviz\UI;

class StockChartXAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function type($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function axisCrossingValue($value) {
        $this->setProperty('axisCrossingValue', $value);

        return $this;
    }

    public function baseUnit($value) {
        $this->setProperty('baseUnit', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\StockChartXAxisItemLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function majorUnit($value) {
        $this->setProperty('majorUnit', $value);

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

    public function minorUnit($value) {
        $this->setProperty('minorUnit', $value);

        return $this;
    }

    public function line(\Kendo\Dataviz\UI\StockChartXAxisItemLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function majorGridLines(\Kendo\Dataviz\UI\StockChartXAxisItemMajorGridLines $value) {
        $this->setProperty('majorGridLines', $value);

        return $this;
    }

    public function majorTicks(\Kendo\Dataviz\UI\StockChartXAxisItemMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

        return $this;
    }

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function narrowRange($value) {
        $this->setProperty('narrowRange', $value);

        return $this;
    }

    public function pane($value) {
        $this->setProperty('pane', $value);

        return $this;
    }

    public function addPlotBand(\Kendo\Dataviz\UI\StockChartXAxisItemPlotBand $value) {
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

    public function title(\Kendo\Dataviz\UI\StockChartXAxisItemTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
