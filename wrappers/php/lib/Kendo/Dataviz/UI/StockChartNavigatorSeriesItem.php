<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItem extends \Kendo\SerializableObject {
//>> Properties

    public function type($value) {
        return $this->setProperty('type', $value);
    }

    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    public function data($value) {
        return $this->setProperty('data', $value);
    }

    public function highField($value) {
        return $this->setProperty('highField', $value);
    }

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function groupNameTemplate($value) {
        return $this->setProperty('groupNameTemplate', $value);
    }

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function highlight(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemHighlight $value) {
        return $this->setProperty('highlight', $value);
    }

    public function aggregate($value) {
        return $this->setProperty('aggregate', $value);
    }

    public function axis($value) {
        return $this->setProperty('axis', $value);
    }

    public function border(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function closeField($value) {
        return $this->setProperty('closeField', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function colorField($value) {
        return $this->setProperty('colorField', $value);
    }

    public function downColor($value) {
        return $this->setProperty('downColor', $value);
    }

    public function downColorField($value) {
        return $this->setProperty('downColorField', $value);
    }

    public function gap($value) {
        return $this->setProperty('gap', $value);
    }

    public function labels(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function line($value) {
        return $this->setProperty('line', $value);
    }

    public function lowField($value) {
        return $this->setProperty('lowField', $value);
    }

    public function markers(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemMarkers $value) {
        return $this->setProperty('markers', $value);
    }

    public function missingValues($value) {
        return $this->setProperty('missingValues', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function openField($value) {
        return $this->setProperty('openField', $value);
    }

    public function overlay(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemOverlay $value) {
        return $this->setProperty('overlay', $value);
    }

    public function spacing($value) {
        return $this->setProperty('spacing', $value);
    }

    public function stack($value) {
        return $this->setProperty('stack', $value);
    }

    public function tooltip(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemTooltip $value) {
        return $this->setProperty('tooltip', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
