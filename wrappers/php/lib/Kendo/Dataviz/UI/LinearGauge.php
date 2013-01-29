<?php

namespace Kendo\Dataviz\UI;

class LinearGauge extends \Kendo\UI\Widget {
    protected function name() {
        return 'LinearGauge';
    }
//>> Properties

    /**
    * The gauge area configuration options.
This is the entire visible area of the gauge.
    * @param \Kendo\Dataviz\UI\LinearGaugeGaugeArea $value
    */
    public function gaugeArea(\Kendo\Dataviz\UI\LinearGaugeGaugeArea $value) {
        return $this->setProperty('gaugeArea', $value);
    }

    /**
    * The pointer configuration options.
    * @param \Kendo\Dataviz\UI\LinearGaugePointer $value
    */
    public function pointer(\Kendo\Dataviz\UI\LinearGaugePointer $value) {
        return $this->setProperty('pointer', $value);
    }

    /**
    * Configures the scale.
    * @param \Kendo\Dataviz\UI\LinearGaugeScale $value
    */
    public function scale(\Kendo\Dataviz\UI\LinearGaugeScale $value) {
        return $this->setProperty('scale', $value);
    }

    /**
    * A value indicating if transition animations should be played.
    * @param boolean $value
    */
    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

//<< Properties
}

?>
