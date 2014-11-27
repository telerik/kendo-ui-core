<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The type of the series. Available types:
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The series line dash type.** Applicable only to line series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * Array of data items. The data item type can be either a:
    * @param array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The data field containing a boolean value that indicates if the sector is exploded.** Available for pie series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function explodeField($value) {
        return $this->setProperty('explodeField', $value);
    }

    /**
    * The data field containing the current value.** Available for bullet and verticalBullet series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function currentField($value) {
        return $this->setProperty('currentField', $value);
    }

    /**
    * The data field containing the target value.** Available for bullet and verticalBullet series. **** Available for pie series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function targetField($value) {
        return $this->setProperty('targetField', $value);
    }

    /**
    * The data field containing the series value.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function field($value) {
        return $this->setProperty('field', $value);
    }

    /**
    * The series name.The name can also be a template which sets the name of the series when bound to grouped data source.The fields which can be used in the template are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Configures the appearance of highlighted points.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemHighlight|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function highlight($value) {
        return $this->setProperty('highlight', $value);
    }

    /**
    * The aggregate function to apply for date series.This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.The supported values are:
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function aggregate($value) {
        return $this->setProperty('aggregate', $value);
    }

    /**
    * The name of the value axis to use.** Applicable to area, bar, column and line series **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function axis($value) {
        return $this->setProperty('axis', $value);
    }

    /**
    * The border of the points.** Applicable to bar, column and pie series **
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The data field containing the point category name.** Applicable to pie series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function categoryField($value) {
        return $this->setProperty('categoryField', $value);
    }

    /**
    * The series base color. The supported values are:
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The data field containing the point color.** Applicable for bar, column and pie series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function colorField($value) {
        return $this->setProperty('colorField', $value);
    }

    /**
    * The label connectors options.** Applicable to pie series. **
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemConnectors|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function connectors($value) {
        return $this->setProperty('connectors', $value);
    }

    /**
    * The distance between category clusters.** Applicable for bar and column series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    /**
    * Configures the series data labels.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemLabels|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Line options.** Applicable to area series. **
    * @param string|\Kendo\Dataviz\UI\SparklineSeriesItemLine|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Marker options.** Applicable to area and line series **
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemMarkers|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function markers($value) {
        return $this->setProperty('markers', $value);
    }

    /**
    * The behavior for handling missing values. The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function missingValues($value) {
        return $this->setProperty('missingValues', $value);
    }

    /**
    * The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

    /**
    * Color to use for bars with negative values.** Applicable only to bar and column series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function negativeColor($value) {
        return $this->setProperty('negativeColor', $value);
    }

    /**
    * The series opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The effects overlay.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemOverlay|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function overlay($value) {
        return $this->setProperty('overlay', $value);
    }

    /**
    * The padding around the chart (equal on all sides).** Available for pie series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The size (or radius) of the series in pixels.
If not specified, the available space is split evenly between the series.Available for only.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The start angle of the first segment.Available for pie series.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function startAngle($value) {
        return $this->setProperty('startAngle', $value);
    }

    /**
    * Space between points as proportion of the point width.** Available for bar and column series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    /**
    * A boolean value indicating if the series should be stacked.
A string value is interpreted as series.stack.group.
    * @param boolean|string|\Kendo\Dataviz\UI\SparklineSeriesItemStack|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    /**
    * The data point tooltip configuration options.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemTooltip|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The line width.** Available for line series **
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The target of the bullet chart.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemTarget|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function target($value) {
        return $this->setProperty('target', $value);
    }

    /**
    * The series notes configuration.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemNotes|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function notes($value) {
        return $this->setProperty('notes', $value);
    }

    /**
    * An optional Z-index that can be used to change the default stacking order of series.The series with the highest Z-index will be placed on top.Series with no Z-index will use the default stacking order based on series type.
For example line series will be on top with bar and area following below.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItem
    */
    public function zIndex($value) {
        return $this->setProperty('zIndex', $value);
    }

//<< Properties
}

?>
