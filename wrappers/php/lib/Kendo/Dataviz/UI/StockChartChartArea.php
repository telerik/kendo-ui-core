<?php

namespace Kendo\Dataviz\UI;

class StockChartChartArea extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the chart area.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartChartArea
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The background opacity of the chart area.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartChartArea
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The border of the chart area.
    * @param \Kendo\Dataviz\UI\StockChartChartAreaBorder $value
    * @returns \Kendo\Dataviz\UI\StockChartChartArea
    */
    public function border(\Kendo\Dataviz\UI\StockChartChartAreaBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The height of the chart area.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartChartArea
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The margin of the chart area.
    * @param float|Object $value
    * @returns \Kendo\Dataviz\UI\StockChartChartArea
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The width of the chart area.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartChartArea
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
