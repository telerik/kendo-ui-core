<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    public function endAngle($value) {
        return $this->setProperty('endAngle', $value);
    }

    public function labels(\Kendo\Dataviz\UI\RadialGaugeScaleLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function majorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMajorTicks $value) {
        return $this->setProperty('majorTicks', $value);
    }

    public function majorUnit($value) {
        return $this->setProperty('majorUnit', $value);
    }

    public function max($value) {
        return $this->setProperty('max', $value);
    }

    public function min($value) {
        return $this->setProperty('min', $value);
    }

    public function minorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks $value) {
        return $this->setProperty('minorTicks', $value);
    }

    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    public function addRange(\Kendo\Dataviz\UI\RadialGaugeScaleRange $value) {
        return $this->add('ranges', $value);
    }

    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    public function startAngle($value) {
        return $this->setProperty('startAngle', $value);
    }

//<< Properties
}

?>
