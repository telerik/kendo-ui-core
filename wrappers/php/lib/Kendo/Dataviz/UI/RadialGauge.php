<?php

namespace Kendo\Dataviz\UI;

class RadialGauge extends \Kendo\UI\Widget {
    protected function name() {
        return 'RadialGauge';
    }
//>> Properties

    /**
    * The gauge area configuration options.
This is the entire visible area of the gauge.
    * @param mixed|\Kendo\Dataviz\UI\RadialGaugeGaugeArea $value
    * @return \Kendo\Dataviz\UI\RadialGauge
    */
    public function gaugeArea($value) {
        return $this->setProperty('gaugeArea', $value);
    }

    /**
    * The pointer configuration options.
    * @param mixed|\Kendo\Dataviz\UI\RadialGaugePointer $value
    * @return \Kendo\Dataviz\UI\RadialGauge
    */
    public function pointer($value) {
        return $this->setProperty('pointer', $value);
    }

    /**
    * The width of the range indicators.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGauge
    */
    public function rangeSize($value) {
        return $this->setProperty('rangeSize', $value);
    }

    /**
    * The distance from the range indicators to the ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGauge
    */
    public function rangeDistance($value) {
        return $this->setProperty('rangeDistance', $value);
    }

    /**
    * Configures the scale.
    * @param mixed|\Kendo\Dataviz\UI\RadialGaugeScale $value
    * @return \Kendo\Dataviz\UI\RadialGauge
    */
    public function scale($value) {
        return $this->setProperty('scale', $value);
    }

    /**
    * A value indicating if transition animations should be played.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\RadialGauge
    */
    public function transitions($value) {
        return $this->setProperty('transitions', $value);
    }

//<< Properties
}

?>
