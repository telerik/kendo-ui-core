<?php

namespace Kendo\Dataviz\UI;

class ChartYAxisItemLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the labels. Any valid CSS color string will work here, including
hex and rgb
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\ChartYAxisItemLabelsBorder $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function border(\Kendo\Dataviz\UI\ChartYAxisItemLabelsBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels. Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels.
    * @param float|Object $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function mirror($value) {
        return $this->setProperty('mirror', $value);
    }

    /**
    * The padding of the labels.
    * @param float|Object $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The rotation angle of the labels.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

    /**
    * Number of labels to skip.
Skips rendering the first n labels.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function skip($value) {
        return $this->setProperty('skip', $value);
    }

    /**
    * Label rendering step.
Every n-th label is rendered where n is the step
    * @param float $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function step($value) {
        return $this->setProperty('step', $value);
    }

    /**
    * The label template.
    * @param string|\kendo\JavaScriptFunction $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The visibility of the labels.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * Culture to use for formatting the dates. See Globalization for more information.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function culture($value) {
        return $this->setProperty('culture', $value);
    }

    /**
    * Date format strings
    * @param Object $value
    * @returns \Kendo\Dataviz\UI\ChartYAxisItemLabels
    */
    public function dateFormats($value) {
        return $this->setProperty('dateFormats', $value);
    }

//<< Properties
}

?>
