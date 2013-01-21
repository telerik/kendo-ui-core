<?php

namespace Kendo\Dataviz\UI;

class RadialGauge extends \Kendo\UI\Widget {
    public function name() {
        return 'RadialGauge';
    }
//>> Properties

    public function gaugeArea(\Kendo\Dataviz\UI\RadialGaugeGaugeArea $value) {
        $this->setProperty('gaugeArea', $value);

        return $this;
    }

    public function pointer(\Kendo\Dataviz\UI\RadialGaugePointer $value) {
        $this->setProperty('pointer', $value);

        return $this;
    }

    public function rangeSize($value) {
        $this->setProperty('rangeSize', $value);

        return $this;
    }

    public function rangeDistance($value) {
        $this->setProperty('rangeDistance', $value);

        return $this;
    }

    public function scale(\Kendo\Dataviz\UI\RadialGaugeScale $value) {
        $this->setProperty('scale', $value);

        return $this;
    }

    public function transitions($value) {
        $this->setProperty('transitions', $value);

        return $this;
    }

//<< Properties
}

?>
