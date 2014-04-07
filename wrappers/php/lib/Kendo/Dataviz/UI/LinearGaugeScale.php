<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Configures the axis line.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleLine|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Configures the scale labels.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleLabels|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Configures the scale major ticks.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleMajorTicks|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function majorTicks($value) {
        return $this->setProperty('majorTicks', $value);
    }

    /**
    * The interval between major divisions.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    /**
    * The maximum value of the scale.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the scale.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Configures the scale minor ticks.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleMinorTicks|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function minorTicks($value) {
        return $this->setProperty('minorTicks', $value);
    }

    /**
    * The interval between minor divisions.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    /**
    * Mirrors the scale labels and ticks.
If the labels are normally on the left side of the scale, mirroring the scale will render them to the right.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function mirror($value) {
        return $this->setProperty('mirror', $value);
    }

    /**
    * Adds LinearGaugeScaleRange to the LinearGaugeScale.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleRange|array,... $value one or more LinearGaugeScaleRange to add.
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function addRange($value) {
        return $this->add('ranges', func_get_args());
    }

    /**
    * The default color for the ranges.
    * @param string $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function rangePlaceholderColor($value) {
        return $this->setProperty('rangePlaceholderColor', $value);
    }

    /**
    * The width of the range indicators.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function rangeSize($value) {
        return $this->setProperty('rangeSize', $value);
    }

    /**
    * Reverses the axis direction - values increase from right to left and from top to bottom.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * The position of the gauge.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function vertical($value) {
        return $this->setProperty('vertical', $value);
    }

//<< Properties
}

?>
