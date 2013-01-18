<?php

namespace kendo\dataviz\ui;

class StockChartValueAxisItem extends \kendo\SerializableObject {
//>> Properties

    public function setAxisCrossingValue($value) {
        $this->setProperty('axisCrossingValue', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setLabels(\kendo\dataviz\ui\StockChartValueAxisItemLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setLine(\kendo\dataviz\ui\StockChartValueAxisItemLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setMajorGridLines(\kendo\dataviz\ui\StockChartValueAxisItemMajorGridLines $value) {
        $this->setProperty('majorGridLines', $value);

        return $this;
    }

    public function setMajorTicks(\kendo\dataviz\ui\StockChartValueAxisItemMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

        return $this;
    }

    public function setMajorUnit($value) {
        $this->setProperty('majorUnit', $value);

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

    public function setMinorGridLines(\kendo\dataviz\ui\StockChartValueAxisItemMinorGridLines $value) {
        $this->setProperty('minorGridLines', $value);

        return $this;
    }

    public function setMinorTicks(\kendo\dataviz\ui\StockChartValueAxisItemMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function setMinorUnit($value) {
        $this->setProperty('minorUnit', $value);

        return $this;
    }

    public function setName($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function setNarrowRange($value) {
        $this->setProperty('narrowRange', $value);

        return $this;
    }

    public function setPane($value) {
        $this->setProperty('pane', $value);

        return $this;
    }

    public function addPlotBand(\kendo\dataviz\ui\StockChartValueAxisItemPlotBand $value) {
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

    public function setTitle(\kendo\dataviz\ui\StockChartValueAxisItemTitle $value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
