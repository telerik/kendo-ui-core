<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    public function line(\Kendo\Dataviz\UI\LinearGaugeScaleLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\LinearGaugeScaleLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function majorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

        return $this;
    }

    public function majorUnit($value) {
        $this->setProperty('majorUnit', $value);

        return $this;
    }

    public function max($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function min($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function minorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function minorUnit($value) {
        $this->setProperty('minorUnit', $value);

        return $this;
    }

    public function mirror($value) {
        $this->setProperty('mirror', $value);

        return $this;
    }

    public function addRange(\Kendo\Dataviz\UI\LinearGaugeScaleRange $value) {
        $values = $this->getProperty('ranges');

        if ($values == null) {
            $values = array();
            $this->setProperty('ranges', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function reverse($value) {
        $this->setProperty('reverse', $value);

        return $this;
    }

    public function vertical($value) {
        $this->setProperty('vertical', $value);

        return $this;
    }

//<< Properties
}

?>
