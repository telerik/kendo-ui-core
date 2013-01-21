<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItem extends \Kendo\SerializableObject {
//>> Properties

    public function axisCrossingValue($value) {
        $this->setProperty('axisCrossingValue', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\ChartValueAxisItemLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function line(\Kendo\Dataviz\UI\ChartValueAxisItemLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function majorGridLines(\Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines $value) {
        $this->setProperty('majorGridLines', $value);

        return $this;
    }

    public function majorTicks(\Kendo\Dataviz\UI\ChartValueAxisItemMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

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

    public function minorGridLines(\Kendo\Dataviz\UI\ChartValueAxisItemMinorGridLines $value) {
        $this->setProperty('minorGridLines', $value);

        return $this;
    }

    public function minorTicks(\Kendo\Dataviz\UI\ChartValueAxisItemMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function minorUnit($value) {
        $this->setProperty('minorUnit', $value);

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

    public function addPlotBand(\Kendo\Dataviz\UI\ChartValueAxisItemPlotBand $value) {
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

    public function title(\Kendo\Dataviz\UI\ChartValueAxisItemTitle $value) {
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
