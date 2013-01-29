<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesDefaultsLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the labels. Any valid CSS color string will work here,
including hex and rgb.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabelsBorder $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function border(\Kendo\Dataviz\UI\StockChartSeriesDefaultsLabelsBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels. Any valid CSS color string will work here, inlcuding hex
and rgb.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the labels.
labels
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels.
    * @param float|Object $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the labels.
    * @param float|Object $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The label template.
Template variables:
    * @param string|\kendo\JavaScriptFunction $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The visibility of the labels.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\StockChartSeriesDefaultsLabels
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
