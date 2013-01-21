<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaults extends \Kendo\SerializableObject {
//>> Properties

    public function setArea($value) {
        $this->setProperty('area', $value);

        return $this;
    }

    public function setCandlestick($value) {
        $this->setProperty('candlestick', $value);

        return $this;
    }

    public function setOhlc($value) {
        $this->setProperty('ohlc', $value);

        return $this;
    }

    public function setBar($value) {
        $this->setProperty('bar', $value);

        return $this;
    }

    public function setBorder(\Kendo\Dataviz\UI\ChartSeriesDefaultsBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setBubble($value) {
        $this->setProperty('bubble', $value);

        return $this;
    }

    public function setColumn($value) {
        $this->setProperty('column', $value);

        return $this;
    }

    public function setDonut($value) {
        $this->setProperty('donut', $value);

        return $this;
    }

    public function setGap($value) {
        $this->setProperty('gap', $value);

        return $this;
    }

    public function setLabels(\Kendo\Dataviz\UI\ChartSeriesDefaultsLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setLine($value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setOverlay($value) {
        $this->setProperty('overlay', $value);

        return $this;
    }

    public function setPie($value) {
        $this->setProperty('pie', $value);

        return $this;
    }

    public function setScatter($value) {
        $this->setProperty('scatter', $value);

        return $this;
    }

    public function setScatterLine($value) {
        $this->setProperty('scatterLine', $value);

        return $this;
    }

    public function setSpacing($value) {
        $this->setProperty('spacing', $value);

        return $this;
    }

    public function setStack($value) {
        $this->setProperty('stack', $value);

        return $this;
    }

    public function setTooltip(\Kendo\Dataviz\UI\ChartSeriesDefaultsTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function setVerticalArea($value) {
        $this->setProperty('verticalArea', $value);

        return $this;
    }

    public function setVerticalLine($value) {
        $this->setProperty('verticalLine', $value);

        return $this;
    }

//<< Properties
}

?>
