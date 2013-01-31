<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItemLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the labels. Any valid CSS color string will work here, including
hex and rgb
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\StockChartYAxisItemLabelsBorder|array $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels. Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function mirror($value) {
        return $this->setProperty('mirror', $value);
    }

    /**
    * The padding of the labels.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The rotation angle of the labels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

    /**
    * Number of labels to skip.
Skips rendering the first n labels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

    /**
    * Label rendering step.
Every n-th label is rendered where n is the step
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The label template.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The visibility of the labels.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * Culture to use for formatting the dates. See Globalization for more information.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Date format strings
    * @param  $value
    * @return \Kendo\Dataviz\UI\StockChartYAxisItemLabels
    */
    public function dateFormats($value) {
        return $this->setProperty('dateFormats', $value);
    }

//<< Properties
}

?>
