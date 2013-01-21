<?php

namespace Kendo\Dataviz\UI;

class LinearGauge extends \Kendo\UI\Widget {
    public function name() {
        return 'LinearGauge';
    }
//>> Properties

    public function setGaugeArea(\Kendo\Dataviz\UI\LinearGaugeGaugeArea $value) {
        $this->setProperty('gaugeArea', $value);

        return $this;
    }

    public function setPointer(\Kendo\Dataviz\UI\LinearGaugePointer $value) {
        $this->setProperty('pointer', $value);

        return $this;
    }

    public function setScale(\Kendo\Dataviz\UI\LinearGaugeScale $value) {
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
