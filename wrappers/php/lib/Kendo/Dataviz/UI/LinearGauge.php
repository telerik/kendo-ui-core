<?php

namespace Kendo\Dataviz\UI;

class LinearGauge extends \Kendo\UI\Widget {
    public function name() {
        return 'LinearGauge';
    }
//>> Properties

    public function gaugeArea(\Kendo\Dataviz\UI\LinearGaugeGaugeArea $value) {
        return $this->setProperty('gaugeArea', $value);
    }

    public function pointer(\Kendo\Dataviz\UI\LinearGaugePointer $value) {
        return $this->setProperty('pointer', $value);
    }

    public function scale(\Kendo\Dataviz\UI\LinearGaugeScale $value) {
        return $this->setProperty('scale', $value);
    }

    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

//<< Properties
}

?>
