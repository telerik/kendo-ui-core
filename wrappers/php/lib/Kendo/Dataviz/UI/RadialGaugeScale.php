<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    public function setEndAngle($value) {
        $this->setProperty('endAngle', $value);

        return $this;
    }

    public function setLabels(\Kendo\Dataviz\UI\RadialGaugeScaleLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setMajorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMajorTicks $value) {
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

    public function setMinorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function setMinorUnit($value) {
        $this->setProperty('minorUnit', $value);

        return $this;
    }

    public function addRange(\Kendo\Dataviz\UI\RadialGaugeScaleRange $value) {
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
