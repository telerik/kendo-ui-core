<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabelsBorder $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function border(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabelsBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels.
    * @param float|Object $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the labels.
    * @param float|Object $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Defines the position of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The label template. Template variables:
    * @param string|\kendo\JavaScriptFunction $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The visibility of the labels.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLabels
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
