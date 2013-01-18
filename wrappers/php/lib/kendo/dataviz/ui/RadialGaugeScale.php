<?php

namespace kendo\dataviz\ui;

class RadialGaugeScale extends \kendo\SerializableObject {
//>> Properties

    public function setEndAngle($value) {
        $this->setProperty('endAngle', $value);

        return $this;
    }

    public function setLabels(\kendo\dataviz\ui\RadialGaugeScaleLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setMajorTicks(\kendo\dataviz\ui\RadialGaugeScaleMajorTicks $value) {
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

    public function setMinorTicks(\kendo\dataviz\ui\RadialGaugeScaleMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function setMinorUnit($value) {
        $this->setProperty('minorUnit', $value);

        return $this;
    }

    public function addRange(\kendo\dataviz\ui\RadialGaugeScaleRange $value) {
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

    public function setStartAngle($value) {
        $this->setProperty('startAngle', $value);

        return $this;
    }

//<< Properties
}

?>
