<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    public function line(\Kendo\Dataviz\UI\LinearGaugeScaleLine $value) {
        return $this->setProperty('line', $value);
    }

    public function labels(\Kendo\Dataviz\UI\LinearGaugeScaleLabels $value) {
        return $this->setProperty('labels', $value);
    }

    public function majorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMajorTicks $value) {
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

    public function minorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMinorTicks $value) {
        return $this->setProperty('minorTicks', $value);
    }

    public function minorUnit($value) {
        return $this->setProperty('minorUnit', $value);
    }

    public function mirror($value) {
        return $this->setProperty('mirror', $value);
    }

    public function addRange(\Kendo\Dataviz\UI\LinearGaugeScaleRange $value) {
        return $this->add('ranges', $value);
    }

    public function reverse($value) {
        return $this->setProperty('reverse', $value);
    }

    public function vertical($value) {
        return $this->setProperty('vertical', $value);
    }

//<< Properties
}

?>
