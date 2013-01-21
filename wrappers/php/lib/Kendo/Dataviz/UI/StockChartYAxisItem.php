<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function setType($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function setAxisCrossingValue($value) {
        $this->setProperty('axisCrossingValue', $value);

        return $this;
    }

    public function setBaseUnit($value) {
        $this->setProperty('baseUnit', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setLabels(\Kendo\Dataviz\UI\StockChartYAxisItemLabels $value) {
        $this->setProperty('labels', $value);

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

    public function setMinorUnit($value) {
        $this->setProperty('minorUnit', $value);

        return $this;
    }

    public function setLine(\Kendo\Dataviz\UI\StockChartYAxisItemLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setMajorGridLines(\Kendo\Dataviz\UI\StockChartYAxisItemMajorGridLines $value) {
        $this->setProperty('majorGridLines', $value);

        return $this;
    }

    public function setMajorTicks(\Kendo\Dataviz\UI\StockChartYAxisItemMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

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

    public function addPlotBand(\Kendo\Dataviz\UI\StockChartYAxisItemPlotBand $value) {
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

    public function setTitle(\Kendo\Dataviz\UI\StockChartYAxisItemTitle $value) {
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
