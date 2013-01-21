<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    public function setLine(\Kendo\Dataviz\UI\LinearGaugeScaleLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setLabels(\Kendo\Dataviz\UI\LinearGaugeScaleLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setMajorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMajorTicks $value) {
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

    public function setMinorTicks(\Kendo\Dataviz\UI\LinearGaugeScaleMinorTicks $value) {
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

    public function addRange(\Kendo\Dataviz\UI\LinearGaugeScaleRange $value) {
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
