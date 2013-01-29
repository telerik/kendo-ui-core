<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Configures the axis line.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleLine $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function line(\Kendo\Dataviz\UI\LinearGaugeScaleLine $value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Configures the scale labels.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleLabels $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function labels(\Kendo\Dataviz\UI\LinearGaugeScaleLabels $value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Configures the scale major ticks.
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleMajorTicks $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function majorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMajorTicks $value) {
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
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleMinorTicks $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function minorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMinorTicks $value) {
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
    * @param \Kendo\Dataviz\UI\LinearGaugeScaleRange,... $value one or more LinearGaugeScaleRange to add.
    * @return \Kendo\Dataviz\UI\LinearGaugeScale
    */
    public function addRange(\Kendo\Dataviz\UI\LinearGaugeScaleRange $value) {
        return $this->add('ranges', func_get_args());
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
