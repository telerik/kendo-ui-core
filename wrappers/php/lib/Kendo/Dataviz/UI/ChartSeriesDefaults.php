<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaults extends \Kendo\SerializableObject {
//>> Properties

    public function area($value) {
        return $this->setProperty('area', $value);
    }

    public function candlestick($value) {
        return $this->setProperty('candlestick', $value);
    }

    public function ohlc($value) {
        return $this->setProperty('ohlc', $value);
    }

    public function bar($value) {
        return $this->setProperty('bar', $value);
    }

    public function border(\Kendo\Dataviz\UI\ChartSeriesDefaultsBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function bubble($value) {
        return $this->setProperty('bubble', $value);
    }

    public function column($value) {
        return $this->setProperty('column', $value);
    }

    public function donut($value) {
        return $this->setProperty('donut', $value);
    }

    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    public function labels(\Kendo\Dataviz\UI\ChartSeriesDefaultsLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function line($value) {
        return $this->setProperty('line', $value);
    }

    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    public function pie($value) {
        return $this->setProperty('pie', $value);
    }

    public function scatter($value) {
        return $this->setProperty('scatter', $value);
    }

    public function scatterLine($value) {
        return $this->setProperty('scatterLine', $value);
    }

    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    public function tooltip(\Kendo\Dataviz\UI\ChartSeriesDefaultsTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

    public function verticalArea($value) {
        return $this->setProperty('verticalArea', $value);
    }

    public function verticalLine($value) {
        return $this->setProperty('verticalLine', $value);
    }

//<< Properties
}

?>
