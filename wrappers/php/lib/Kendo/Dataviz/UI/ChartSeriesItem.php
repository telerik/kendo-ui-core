<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The type of the series. Available types:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The series line dash type.** Applicable only to line and scatterLine series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * Array of data items. The data item type can be either a:
    * @param array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The data field containing a boolean value that indicates if the sector is exploded.** Available for donut and pie series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function explodeField($value) {
        return $this->setProperty('explodeField', $value);
    }

    /**
    * The data field containing the high value.** Available for candlestick and ohlc series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function highField($value) {
        return $this->setProperty('highField', $value);
    }

    /**
    * The the size of the donut hole.** Available for donut series only. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function holeSize($value) {
        return $this->setProperty('holeSize', $value);
    }

    /**
    * The data field containing the series value.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * Sets the groupNameTemplate option of the ChartSeriesItem.
    * Name template for auto-generated series when binding to grouped data.Template variables:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function groupNameTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('groupNameTemplate', $value);
    }

    /**
    * Sets the groupNameTemplate option of the ChartSeriesItem.
    * Name template for auto-generated series when binding to grouped data.Template variables:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function groupNameTemplate($value) {
        return $this->setProperty('groupNameTemplate', $value);
    }

    /**
    * The series name visible in the legend.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Configures the appearance of highlighted points.** Applicable to bubble, pie, candlestick and ohlc series. **
    * @param \Kendo\Dataviz\UI\ChartSeriesItemHighlight|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function highlight($value) {
        return $this->setProperty('highlight', $value);
    }

    /**
    * Aggregate function for date series.This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function aggregate($value) {
        return $this->setProperty('aggregate', $value);
    }

    /**
    * The name of the value axis to use.** Applicable to area, bar, column, line, ohlc and candlestick series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function axis($value) {
        return $this->setProperty('axis', $value);
    }

    /**
    * The border of the points.** Applicable to bar, column, bubble, donut, pie, ohlc and candlestick series **
    * @param \Kendo\Dataviz\UI\ChartSeriesItemBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The data field containing the point category name.** Applicable to bubble, donut and pie series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function categoryField($value) {
        return $this->setProperty('categoryField', $value);
    }

    /**
    * The data field containing the close value.** Available for candlestick and ohlc series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function closeField($value) {
        return $this->setProperty('closeField', $value);
    }

    /**
    * The series base color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The data field containing the point color.** Applicable for bar, column, bubble, donut, pie, candlestick and ohlc series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function colorField($value) {
        return $this->setProperty('colorField', $value);
    }

    /**
    * The label connectors options.** Applicable to donut and pie series. **
    * @param \Kendo\Dataviz\UI\ChartSeriesItemConnectors|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function connectors($value) {
        return $this->setProperty('connectors', $value);
    }

    /**
    * The series color when open value is smoller then close value.** Available for candlestick series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function downColor($value) {
        return $this->setProperty('downColor', $value);
    }

    /**
    * The data field containing the body color.** Available for candlestick series only **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function downColorField($value) {
        return $this->setProperty('downColorField', $value);
    }

    /**
    * The distance between category clusters.** Applicable for bar, column, candlestick and ohlc series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    /**
    * Configures the series data labels.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Line options.** Applicable to area, candlestick and ohlc series. **
    * @param string|\Kendo\Dataviz\UI\ChartSeriesItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The data field containing the low value.** Available for candlestick and ohlc series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function lowField($value) {
        return $this->setProperty('lowField', $value);
    }

    /**
    * The margin around each donut series (ring)** Applicable only to donut series **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * Marker options.** Applicable to area, line, scatter and scatterLine series **
    * @param \Kendo\Dataviz\UI\ChartSeriesItemMarkers|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function markers($value) {
        return $this->setProperty('markers', $value);
    }

    /**
    * The max size of the marker.** Applicable only to bubble series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function maxSize($value) {
        return $this->setProperty('maxSize', $value);
    }

    /**
    * The min size of the marker.** Applicable only to bubble series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function minSize($value) {
        return $this->setProperty('minSize', $value);
    }

    /**
    * Configures the behavior for handling missing values.** Available for area, line and scatterLine series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function missingValues($value) {
        return $this->setProperty('missingValues', $value);
    }

    /**
    * Color to use for bars with negative values.** Applicable only to bar and column series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function negativeColor($value) {
        return $this->setProperty('negativeColor', $value);
    }

    /**
    * The settings for negative values.** Applicable only to bubble series. **
    * @param \Kendo\Dataviz\UI\ChartSeriesItemNegativeValues|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function negativeValues($value) {
        return $this->setProperty('negativeValues', $value);
    }

    /**
    * The series opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The data field containing the open value.** Available for candlestick and ohlc series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function openField($value) {
        return $this->setProperty('openField', $value);
    }

    /**
    * The effects overlay.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemOverlay|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    /**
    * The padding around the chart (equal on all sides).** Available for donut and pie series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The size (or radius) of the series in pixels.
If not specified, the available space is split evenly between the series.Available for donut series only.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The start angle of the first segment.Available for donut and pie series.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function startAngle($value) {
        return $this->setProperty('startAngle', $value);
    }

    /**
    * The data field containing the bubble size value.** Applicable only to bubble series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function sizeField($value) {
        return $this->setProperty('sizeField', $value);
    }

    /**
    * Space between points as proportion of the point width.** Available for bar, column, candlestick and ohlc series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    /**
    * A value indicating if the series should be stacked. String value indicates that the series should be stacked in a group with the specified name.
** Available for bar and column series. **
    * @param boolean|string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemTooltip|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * A boolean value indicating whether to show the point category name in the legend.** Available for bubble and pie series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function visibleInLegendField($value) {
        return $this->setProperty('visibleInLegendField', $value);
    }

    /**
    * The line width.** Available for area, line and scatterLine series **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The name of the X axis to use.** Available for bubble, scatter and scatterLine series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function xAxis($value) {
        return $this->setProperty('xAxis', $value);
    }

    /**
    * The data field containing the X value.** Available for bubble, scatter and scatterLine series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function xField($value) {
        return $this->setProperty('xField', $value);
    }

    /**
    * The name of the Y axis to use.** Available for bubble, scatter and scatterLine series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function yAxis($value) {
        return $this->setProperty('yAxis', $value);
    }

    /**
    * The data field containing the Y value.** Available for bubble, scatter and scatterLine series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function yField($value) {
        return $this->setProperty('yField', $value);
    }

    /**
    * The target of the bullet chart.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemTarget|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItem
    */
    public function target($value) {
        return $this->setProperty('target', $value);
    }

//<< Properties
}

?>
