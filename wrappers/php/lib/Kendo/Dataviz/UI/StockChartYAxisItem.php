<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The axis type.Note: The Chart will automatically switch to a date axis if the series X value
is of type Date. Specify type explicitly when such behavior is undesired.
    * @param string $value
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Value at which the Y axis crosses this axis. (Only for object)Value indicies at which the Y axes cross the value axis. (Only for array)Date at which the Y axis crosses this axis. (Only for date)Note: Specify a value greater than or equal to the
axis maximum value to denote the far end of the axis.
    * @param Object|date|array $value
    */
    public function axisCrossingValue($value) {
        return $this->setProperty('axisCrossingValue', $value);
    }

    /**
    * The base time interval for the axis labels.
The default baseUnit is determined automatically from the value range. Available options:
    * @param string $value
    */
    public function baseUnit($value) {
        return $this->setProperty('baseUnit', $value);
    }

    /**
    * Color to apply to all axis elements.
Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * Configures the axis labels.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemLabels $value
    */
    public function labels(\Kendo\Dataviz\UI\StockChartYAxisItemLabels $value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The interval between major divisions in base units.
    * @param float $value
    */
    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    /**
    * The end date of the axis.
This is often used in combination with the min configuration option.
    * @param Object $value
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The maximum value of the axis.
This is often used in combination with the max configuration option.
    * @param Object $value
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The interval between minor divisions in base units.
It defaults to 1/5th of the majorUnit.
    * @param float $value
    */
    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    /**
    * Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemLine $value
    */
    public function line(\Kendo\Dataviz\UI\StockChartYAxisItemLine $value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemMajorGridLines $value
    */
    public function majorGridLines(\Kendo\Dataviz\UI\StockChartYAxisItemMajorGridLines $value) {
        return $this->setProperty('majorGridLines', $value);
    }

    /**
    * The major ticks of the axis.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemMajorTicks $value
    */
    public function majorTicks(\Kendo\Dataviz\UI\StockChartYAxisItemMajorTicks $value) {
        return $this->setProperty('majorTicks', $value);
    }

    /**
    * The unique axis name.
    * @param Object $value
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Prevents the automatic axis range from snapping to 0.
    * @param boolean $value
    */
    public function narrowRange($value) {
        return $this->setProperty('narrowRange', $value);
    }

    /**
    * The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.
    * @param string $value
    */
    public function pane($value) {
        return $this->setProperty('pane', $value);
    }

    /**
    * Adds StockChartYAxisItemPlotBand to the StockChartYAxisItem.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemPlotBand,... $value one or more StockChartYAxisItemPlotBand to add.
    */
    public function addPlotBand(\Kendo\Dataviz\UI\StockChartYAxisItemPlotBand $value) {
        return $this->add('plotBands', func_get_args());
    }

    /**
    * Reverses the axis direction -
values increase from right to left and from top to bottom.
    * @param boolean $value
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * The title of the value axis.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemTitle $value
    */
    public function title(\Kendo\Dataviz\UI\StockChartYAxisItemTitle $value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The visibility of the axis.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
