<?php

namespace Kendo\Dataviz\UI;

class RadialGauge extends \Kendo\UI\Widget {
    public function name() {
        return 'RadialGauge';
    }
//>> Properties

    public function gaugeArea(\Kendo\Dataviz\UI\RadialGaugeGaugeArea $value) {
        return $this->setProperty('gaugeArea', $value);
    }

    public function pointer(\Kendo\Dataviz\UI\RadialGaugePointer $value) {
        return $this->setProperty('pointer', $value);
    }

    public function rangeSize($value) {
        return $this->setProperty('rangeSize', $value);
    }

    public function rangeDistance($value) {
        return $this->setProperty('rangeDistance', $value);
    }

    public function scale(\Kendo\Dataviz\UI\RadialGaugeScale $value) {
        return $this->setProperty('scale', $value);
    }

    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

//<< Properties
}

?>
