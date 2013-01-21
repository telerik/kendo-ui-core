<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItem extends \Kendo\SerializableObject {
//>> Properties

    public function type($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function dashType($value) {
        $this->setProperty('dashType', $value);

        return $this;
    }

    public function data($value) {
        $this->setProperty('data', $value);

        return $this;
    }

    public function highField($value) {
        $this->setProperty('highField', $value);

        return $this;
    }

    public function field($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function groupNameTemplate($value) {
        $this->setProperty('groupNameTemplate', $value);

        return $this;
    }

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function highlight(\Kendo\Dataviz\UI\StockChartSeriesItemHighlight $value) {
        $this->setProperty('highlight', $value);

        return $this;
    }

    public function aggregate($value) {
        $this->setProperty('aggregate', $value);

        return $this;
    }

    public function axis($value) {
        $this->setProperty('axis', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\StockChartSeriesItemBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function closeField($value) {
        $this->setProperty('closeField', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function colorField($value) {
        $this->setProperty('colorField', $value);

        return $this;
    }

    public function downColor($value) {
        $this->setProperty('downColor', $value);

        return $this;
    }

    public function downColorField($value) {
        $this->setProperty('downColorField', $value);

        return $this;
    }

    public function gap($value) {
        $this->setProperty('gap', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\StockChartSeriesItemLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function line($value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function line(\Kendo\Dataviz\UI\StockChartSeriesItemLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function lowField($value) {
        $this->setProperty('lowField', $value);

        return $this;
    }

    public function markers(\Kendo\Dataviz\UI\StockChartSeriesItemMarkers $value) {
        $this->setProperty('markers', $value);

        return $this;
    }

    public function missingValues($value) {
        $this->setProperty('missingValues', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function openField($value) {
        $this->setProperty('openField', $value);

        return $this;
    }

    public function overlay(\Kendo\Dataviz\UI\StockChartSeriesItemOverlay $value) {
        $this->setProperty('overlay', $value);

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

    public function tooltip(\Kendo\Dataviz\UI\StockChartSeriesItemTooltip $value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function width($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
