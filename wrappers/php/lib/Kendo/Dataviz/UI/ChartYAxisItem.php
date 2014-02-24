<?php

namespace Kendo\Dataviz\UI;

class ChartYAxisItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Value at which the Y axis crosses this axis. (Only for object)Value indices at which the Y axes cross the value axis. (Only for array)Date at which the Y axis crosses this axis. (Only for date)
    * @param |date|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function axisCrossingValue($value) {
        return $this->setProperty('axisCrossingValue', $value);
    }

    /**
    * The background color of the axis.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The base time interval for the axis labels. The default baseUnit is determined automatically from the value range. Available options:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function baseUnit($value) {
        return $this->setProperty('baseUnit', $value);
    }

    /**
    * The color of the axis. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The crosshair configuration options.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemCrosshair|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function crosshair($value) {
        return $this->setProperty('crosshair', $value);
    }

    /**
    * The axis labels configuration.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemMajorGridLines|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function majorGridLines($value) {
        return $this->setProperty('majorGridLines', $value);
    }

    /**
    * The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemMinorGridLines|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function minorGridLines($value) {
        return $this->setProperty('minorGridLines', $value);
    }

    /**
    * The configuration of the y axis minor ticks.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemMinorTicks|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function minorTicks($value) {
        return $this->setProperty('minorTicks', $value);
    }

    /**
    * The configuration of the scatter chart y axis major ticks.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemMajorTicks|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function majorTicks($value) {
        return $this->setProperty('majorTicks', $value);
    }

    /**
    * The interval between major divisions.
If this is a date axis the value represents the number of xAxis.baseUnits between major divisions.
If the yAxis.type is set to "log", the majorUnit value will be used for the base of the logarithm.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    /**
    * The maximum value of the axis.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the axis.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The interval between minor divisions. It defaults to 1/5th of the yAxis.majorUnit.
If the yAxis.type is set to "log", the minorUnit value represents the number of divisions between two major units and defaults to the major unit minus one.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    /**
    * The unique axis name. Used to associate a series with a y axis using the series.yAxis option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * If set to true the chart will prevent the automatic axis range from snapping to 0.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function narrowRange($value) {
        return $this->setProperty('narrowRange', $value);
    }

    /**
    * The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function pane($value) {
        return $this->setProperty('pane', $value);
    }

    /**
    * Adds ChartYAxisItemPlotBand to the ChartYAxisItem.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemPlotBand|array,... $value one or more ChartYAxisItemPlotBand to add.
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function addPlotBand($value) {
        return $this->add('plotBands', func_get_args());
    }

    /**
    * If set to true the value axis direction will be reversed. By default values increase from left to right and from bottom to top.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * The title configuration of the scatter chart y axis.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemTitle|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The axis type.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * If set to true the chart will display the y axis. By default the y axis is visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The y axis notes configuration.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemNotes|array $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItem
    */
    public function notes($value) {
        return $this->setProperty('notes', $value);
    }

//<< Properties
}

?>
