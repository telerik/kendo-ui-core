<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The end angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinat system)
    * @param float $value
    */
    public function endAngle($value) {
        return $this->setProperty('endAngle', $value);
    }

    /**
    * Configures the scale labels.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleLabels $value
    */
    public function labels(\Kendo\Dataviz\UI\RadialGaugeScaleLabels $value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Configures the scale major ticks.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleMajorTicks $value
    */
    public function majorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMajorTicks $value) {
        return $this->setProperty('majorTicks', $value);
    }

    /**
    * The interval between major divisions.
    * @param float $value
    */
    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    /**
    * The maximum value of the scale.
    * @param float $value
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value of the scale.
    * @param float $value
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Configures the scale minor ticks.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks $value
    */
    public function minorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks $value) {
        return $this->setProperty('minorTicks', $value);
    }

    /**
    * The interval between minor divisions.
    * @param float $value
    */
    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    /**
    * Adds RadialGaugeScaleRange to the RadialGaugeScale.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleRange,... $value one or more RadialGaugeScaleRange to add.
    */
    public function addRange(\Kendo\Dataviz\UI\RadialGaugeScaleRange $value) {
        return $this->add('ranges', func_get_args());
    }

    /**
    * Reverses the scale direction - values are increase anticlockwise.
    * @param boolean $value
    */
    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    /**
    * The start angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinat system)
    * @param float $value
    */
    public function startAngle($value) {
        return $this->setProperty('startAngle', $value);
    }

//<< Properties
}

?>
