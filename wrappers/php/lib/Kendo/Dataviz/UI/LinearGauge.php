<?php

namespace Kendo\Dataviz\UI;

class LinearGauge extends \Kendo\UI\Widget {
    public function name() {
        return 'LinearGauge';
    }
//>> Properties

    public function gaugeArea(\Kendo\Dataviz\UI\LinearGaugeGaugeArea $value) {
        $this->setProperty('gaugeArea', $value);

        return $this;
    }

    public function pointer(\Kendo\Dataviz\UI\LinearGaugePointer $value) {
        $this->setProperty('pointer', $value);

        return $this;
    }

    public function scale(\Kendo\Dataviz\UI\LinearGaugeScale $value) {
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
