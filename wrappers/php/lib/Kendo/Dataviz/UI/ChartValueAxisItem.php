<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Value at which the category axis crosses this axis. (Only for object)Value indices at which the category axes cross the value axis. (Only for array)Date at which the category axis crosses this axis. (Only for date)
    * @param |date|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function axisCrossingValue($value) {
        return $this->setProperty('axisCrossingValue', $value);
    }

    /**
    * The background color of the axis.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The color of the value axis. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The crosshair configuration options.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemCrosshair|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function crosshair($value) {
        return $this->setProperty('crosshair', $value);
    }

    /**
    * The axis labels configuration.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemMajorGridLines|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function majorGridLines($value) {
        return $this->setProperty('majorGridLines', $value);
    }

    /**
    * The interval between major divisions.
If the valueAxis.type is set to "log", the majorUnit value will be used for the base of the logarithm.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    /**
    * The maximum value of the axis.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the axis.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemMinorGridLines|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function minorGridLines($value) {
        return $this->setProperty('minorGridLines', $value);
    }

    /**
    * The configuration of the value axis major ticks.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemMajorTicks|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function majorTicks($value) {
        return $this->setProperty('majorTicks', $value);
    }

    /**
    * The configuration of the value axis minor ticks.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemMinorTicks|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function minorTicks($value) {
        return $this->setProperty('minorTicks', $value);
    }

    /**
    * The interval between minor divisions. It defaults to 1/5th of the valueAxis.majorUnit.
If the valueAxis.type is set to "log", the minorUnit value represents the number of divisions between two major units and defaults to the major unit minus one.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    /**
    * The unique axis name. Used to associate a series with a value axis using the series.axis option.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * If set to true the chart will prevent the automatic axis range from snapping to 0.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function narrowRange($value) {
        return $this->setProperty('narrowRange', $value);
    }

    /**
    * The name of the pane that the value axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function pane($value) {
        return $this->setProperty('pane', $value);
    }

    /**
    * Adds ChartValueAxisItemPlotBand to the ChartValueAxisItem.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemPlotBand|array,... $value one or more ChartValueAxisItemPlotBand to add.
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function addPlotBand($value) {
        return $this->add('plotBands', func_get_args());
    }

    /**
    * If set to true the value axis direction will be reversed. By default categories are listed from left to right and from bottom to top.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * The title configuration of the value axis.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemTitle|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The axis type.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * If set to true the chart will display the value axis. By default the value axis is visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The value axis notes configuration.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotes|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItem
    */
    public function notes($value) {
        return $this->setProperty('notes', $value);
    }

//<< Properties
}

?>
