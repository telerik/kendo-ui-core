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
    * @param \Kendo\Dataviz\UI\LinearGaugeGaugeArea|array $value
    * @return \Kendo\Dataviz\UI\LinearGauge
    */
    public function gaugeArea($value) {
        return $this->setProperty('gaugeArea', $value);
    }

    /**
    * Adds LinearGaugePointerItem to the LinearGauge.
    * @param \Kendo\Dataviz\UI\LinearGaugePointerItem|array,... $value one or more LinearGaugePointerItem to add.
    * @return \Kendo\Dataviz\UI\LinearGauge
    */
    public function addPointerItem($value) {
        return $this->add('pointer', func_get_args());
    }

    /**
    * Sets the preferred rendering engine.
If it is not supported by the browser, the Gauge will switch to the first available mode.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\LinearGauge
    */
    public function renderAs($value) {
        return $this->setProperty('renderAs', $value);
    }

    /**
    * Configures the scale.
    * @param \Kendo\Dataviz\UI\LinearGaugeScale|array $value
    * @return \Kendo\Dataviz\UI\LinearGauge
    */
    public function scale($value) {
        return $this->setProperty('scale', $value);
    }

    /**
    * A value indicating if transition animations should be played.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\LinearGauge
    */
    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }


//<< Properties

    /**
    * The pointer configuration options.
    * @param \Kendo\Dataviz\UI\LinearGaugePointer|array $value
    * @return \Kendo\Dataviz\UI\LinearGauge
    */
    public function pointer($value) {
        return $this->setProperty('pointer', $value);
    }
}

?>
