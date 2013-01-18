<?php

namespace kendo\dataviz\ui;

class RadialGauge extends \kendo\ui\Widget {
    public function name() {
        return 'RadialGauge';
    }
//>> Properties

    public function setGaugeArea(\kendo\dataviz\ui\RadialGaugeGaugeArea $value) {
        $this->setProperty('gaugeArea', $value);

        return $this;
    }

    public function setPointer(\kendo\dataviz\ui\RadialGaugePointer $value) {
        $this->setProperty('pointer', $value);

        return $this;
    }

    public function setRangeSize($value) {
        $this->setProperty('rangeSize', $value);

        return $this;
    }

    public function setRangeDistance($value) {
        $this->setProperty('rangeDistance', $value);

        return $this;
    }

    public function setScale(\kendo\dataviz\ui\RadialGaugeScale $value) {
        $this->setProperty('scale', $value);

        return $this;
    }

    public function setTransitions($value) {
        $this->setProperty('transitions', $value);

        return $this;
    }

//<< Properties
}

?>
