<?php

namespace Kendo\Dataviz\UI;

class RadialGauge extends \Kendo\UI\Widget {
    public function name() {
        return 'RadialGauge';
    }
//>> Properties

    public function setGaugeArea(\Kendo\Dataviz\UI\RadialGaugeGaugeArea $value) {
        $this->setProperty('gaugeArea', $value);

        return $this;
    }

    public function setPointer(\Kendo\Dataviz\UI\RadialGaugePointer $value) {
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

    public function setScale(\Kendo\Dataviz\UI\RadialGaugeScale $value) {
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
