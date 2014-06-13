<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The discrete categoryAxis.baseUnitStep values when
either categoryAxis.baseUnit is set to "fit" or
categoryAxis.baseUnitStep is set to "auto".
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemAutoBaseUnitSteps|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function autoBaseUnitSteps($value) {
        return $this->setProperty('autoBaseUnitSteps', $value);
    }

    /**
    * Category index at which the first value axis crosses this axis (when set as an object).Category indices at which the value axes cross the category axis (when set as an array).
    * @param |date|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function axisCrossingValue($value) {
        return $this->setProperty('axisCrossingValue', $value);
    }

    /**
    * The background color of the axis.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The base time interval for the date axis. The default base unit is determined automatically from the minimum difference
between subsequent categories.The supported values are:Setting baseUnit to "fit" will set such base unit and categoryAxis.baseUnitStep
that the total number of categories does not exceed categoryAxis.maxDateGroups.Series data is aggregated for the specified base unit using the series.aggregate function.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function baseUnit($value) {
        return $this->setProperty('baseUnit', $value);
    }

    /**
    * The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
that the total number of categories does not exceed categoryAxis.maxDateGroups.This option is ignored if categoryAxis.baseUnit is set to "fit".
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function baseUnitStep($value) {
        return $this->setProperty('baseUnitStep', $value);
    }

    /**
    * The category names. The chart will create a category for every item of the array.
    * @param array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function categories($value) {
        return $this->setProperty('categories', $value);
    }

    /**
    * The color to apply to all axis elements. Accepts a valid CSS color string, including hex and rgb. Can be overridden by categoryAxis.labels.color and
categoryAxis.line.color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The crosshair configuration options.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemCrosshair|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function crosshair($value) {
        return $this->setProperty('crosshair', $value);
    }

    /**
    * The data item field which contains the category name. Requires the dataSource option to be set.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * If set to true the chart will position categories and series points on major ticks. This removes the empty space before and after the series.The default value is false except for "area" and "verticalArea".
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function justified($value) {
        return $this->setProperty('justified', $value);
    }

    /**
    * The axis labels configuration.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorGridLines|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function majorGridLines($value) {
        return $this->setProperty('majorGridLines', $value);
    }

    /**
    * The configuration of the category axis major ticks.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemMajorTicks|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function majorTicks($value) {
        return $this->setProperty('majorTicks', $value);
    }

    /**
    * The last date displayed on the category date axis. By default, the minimum date is the same as the last category.
This is often used in combination with the categoryAxis.min and categoryAxis.roundToBaseUnit options to
set up a fixed date range.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The maximum number of groups (categories) to display when
categoryAxis.baseUnit is set to "fit" or
categoryAxis.baseUnitStep is set to "auto".
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function maxDateGroups($value) {
        return $this->setProperty('maxDateGroups', $value);
    }

    /**
    * The first date displayed on the category date axis. By default, the minimum date is the same as the first category.
This is often used in combination with the categoryAxis.min and categoryAxis.roundToBaseUnit options to
set up a fixed date range.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorGridLines|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function minorGridLines($value) {
        return $this->setProperty('minorGridLines', $value);
    }

    /**
    * The configuration of the category axis minor ticks.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemMinorTicks|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function minorTicks($value) {
        return $this->setProperty('minorTicks', $value);
    }

    /**
    * The unique axis name. Used to associate a series with a category axis using the series.categoryAxis option.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The name of the pane that the category axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function pane($value) {
        return $this->setProperty('pane', $value);
    }

    /**
    * Adds ChartCategoryAxisItemPlotBand to the ChartCategoryAxisItem.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemPlotBand|array,... $value one or more ChartCategoryAxisItemPlotBand to add.
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function addPlotBand($value) {
        return $this->add('plotBands', func_get_args());
    }

    /**
    * If set to true the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * If set to true the chart will round the first and last date to the nearest base unit.The roundToBaseUnit option will be ignored if series.type is set to "bar", "column", "boxPlot", "ohlc", "candlestick" or "waterfall".
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function roundToBaseUnit($value) {
        return $this->setProperty('roundToBaseUnit', $value);
    }

    /**
    * The selected axis range. If set, axis selection will be enabled.The range units are:
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemSelect|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function select($value) {
        return $this->setProperty('select', $value);
    }

    /**
    * The angle (degrees) of the first category on the axis.Angles increase clockwise and zero is to the left. Negative values are acceptable.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function startAngle($value) {
        return $this->setProperty('startAngle', $value);
    }

    /**
    * The title configuration of the category axis.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemTitle|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function title($value) {
        return $this->setProperty('title', $value);
    }

    /**
    * The category axis type.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * If set to true the chart will display the category axis. By default the category axis is visible.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The week start day when categoryAxis.baseUnit is set to "weeks".The supported values are:
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function weekStartDay($value) {
        return $this->setProperty('weekStartDay', $value);
    }

    /**
    * The category axis notes configuration.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotes|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItem
    */
    public function notes($value) {
        return $this->setProperty('notes', $value);
    }

//<< Properties
}

?>
