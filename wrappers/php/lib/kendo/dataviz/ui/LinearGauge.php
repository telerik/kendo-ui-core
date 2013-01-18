<?php

namespace kendo\dataviz\ui;

class LinearGauge extends \kendo\ui\Widget {
    public function name() {
        return 'LinearGauge';
    }
//>> Properties

    public function setGaugeArea(\kendo\dataviz\ui\LinearGaugeGaugeArea $value) {
        $this->setProperty('gaugeArea', $value);

        return $this;
    }

    public function setPointer(\kendo\dataviz\ui\LinearGaugePointer $value) {
        $this->setProperty('pointer', $value);

        return $this;
    }

    public function setScale(\kendo\dataviz\ui\LinearGaugeScale $value) {
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
