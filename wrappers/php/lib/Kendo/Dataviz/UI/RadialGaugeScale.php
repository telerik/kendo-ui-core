<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The end angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinat system)
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function endAngle($value) {
        return $this->setProperty('endAngle', $value);
    }

    /**
    * Configures the scale labels.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleLabels|array $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Configures the scale major ticks.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleMajorTicks|array $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function majorTicks($value) {
        return $this->setProperty('majorTicks', $value);
    }

    /**
    * The interval between major divisions.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    /**
    * The maximum value of the scale.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the scale.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Configures the scale minor ticks.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks|array $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function minorTicks($value) {
        return $this->setProperty('minorTicks', $value);
    }

    /**
    * The interval between minor divisions.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    /**
    * Adds RadialGaugeScaleRange to the RadialGaugeScale.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleRange|array,... $value one or more RadialGaugeScaleRange to add.
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function addRange($value) {
        return $this->add('ranges', func_get_args());
    }

    /**
    * The default color for the ranges.
    * @param string $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function rangePlaceholderColor($value) {
        return $this->setProperty('rangePlaceholderColor', $value);
    }

    /**
    * The width of the range indicators.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function rangeSize($value) {
        return $this->setProperty('rangeSize', $value);
    }

    /**
    * The distance from the range indicators to the ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function rangeDistance($value) {
        return $this->setProperty('rangeDistance', $value);
    }

    /**
    * Reverses the scale direction - values are increase anticlockwise.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * The start angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinat system)
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScale
    */
    public function startAngle($value) {
        return $this->setProperty('startAngle', $value);
    }

//<< Properties
}

?>
