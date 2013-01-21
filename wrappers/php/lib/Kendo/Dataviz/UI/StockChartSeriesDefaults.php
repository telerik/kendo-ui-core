<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesDefaults extends \Kendo\SerializableObject {
//>> Properties

    public function area($value) {
        $this->setProperty('area', $value);

        return $this;
    }

    public function candlestick($value) {
        $this->setProperty('candlestick', $value);

        return $this;
    }

    public function ohlc($value) {
        $this->setProperty('ohlc', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\StockChartSeriesDefaultsBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function column($value) {
        $this->setProperty('column', $value);

        return $this;
    }

    public function gap($value) {
        $this->setProperty('gap', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function line($value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function overlay($value) {
        $this->setProperty('overlay', $value);

        return $this;
    }

    public function pie($value) {
        $this->setProperty('pie', $value);

        return $this;
    }

    public function spacing($value) {
        $this->setProperty('spacing', $value);

        return $this;
    }

    public function stack($value) {
        $this->setProperty('stack', $value);

        return $this;
    }

    public function tooltip(\Kendo\Dataviz\UI\StockChartSeriesDefaultsTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

//<< Properties
}

?>
