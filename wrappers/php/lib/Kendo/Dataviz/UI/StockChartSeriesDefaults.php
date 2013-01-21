<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesDefaults extends \Kendo\SerializableObject {
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

    public function border(\Kendo\Dataviz\UI\StockChartSeriesDefaultsBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function column($value) {
        return $this->setProperty('column', $value);
    }

    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    public function labels(\Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels $value) {
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

    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    public function tooltip(\Kendo\Dataviz\UI\StockChartSeriesDefaultsTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

//<< Properties
}

?>
