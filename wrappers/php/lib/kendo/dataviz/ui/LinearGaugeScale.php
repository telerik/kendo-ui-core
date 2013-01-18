<?php

namespace kendo\dataviz\ui;

class LinearGaugeScale extends \kendo\SerializableObject {
//>> Properties

    public function setLine(\kendo\dataviz\ui\LinearGaugeScaleLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setLabels(\kendo\dataviz\ui\LinearGaugeScaleLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setMajorTicks(\kendo\dataviz\ui\LinearGaugeScaleMajorTicks $value) {
        $this->setProperty('majorTicks', $value);

        return $this;
    }

    public function setMajorUnit($value) {
        $this->setProperty('majorUnit', $value);

        return $this;
    }

    public function setMax($value) {
        $this->setProperty('max', $value);

        return $this;
    }

    public function setMin($value) {
        $this->setProperty('min', $value);

        return $this;
    }

    public function setMinorTicks(\kendo\dataviz\ui\LinearGaugeScaleMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function setMinorUnit($value) {
        $this->setProperty('minorUnit', $value);

        return $this;
    }

    public function setMirror($value) {
        $this->setProperty('mirror', $value);

        return $this;
    }

    public function addRange(\kendo\dataviz\ui\LinearGaugeScaleRange $value) {
        $values = $this->getProperty('ranges');

        if ($values == null) {
            $values = array();
            $this->setProperty('ranges', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setReverse($value) {
        $this->setProperty('reverse', $value);

        return $this;
    }

    public function setVertical($value) {
        $this->setProperty('vertical', $value);

        return $this;
    }

//<< Properties
}

?>
