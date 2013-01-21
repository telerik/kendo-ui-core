<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeScale extends \Kendo\SerializableObject {
//>> Properties

    public function endAngle($value) {
        $this->setProperty('endAngle', $value);

        return $this;
    }

    public function labels(\Kendo\Dataviz\UI\RadialGaugeScaleLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function majorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMajorTicks $value) {
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

    public function minorTicks(\Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks $value) {
        $this->setProperty('minorTicks', $value);

        return $this;
    }

    public function minorUnit($value) {
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

    public function reverse($value) {
        $this->setProperty('reverse', $value);

        return $this;
    }

    public function startAngle($value) {
        $this->setProperty('startAngle', $value);

        return $this;
    }

//<< Properties
}

?>
