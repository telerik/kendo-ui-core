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
    * @param \Kendo\Dataviz\UI\RadialGaugeGaugeArea $value
    */
    public function gaugeArea(\Kendo\Dataviz\UI\RadialGaugeGaugeArea $value) {
        return $this->setProperty('gaugeArea', $value);
    }

    /**
    * The pointer configuration options.
    * @param \Kendo\Dataviz\UI\RadialGaugePointer $value
    */
    public function pointer(\Kendo\Dataviz\UI\RadialGaugePointer $value) {
        return $this->setProperty('pointer', $value);
    }

    /**
    * The width of the range indicators.
    * @param float $value
    */
    public function rangeSize($value) {
        return $this->setProperty('rangeSize', $value);
    }

    /**
    * The distance from the range indicators to the ticks.
    * @param float $value
    */
    public function rangeDistance($value) {
        return $this->setProperty('rangeDistance', $value);
    }

    /**
    * Configures the scale.
    * @param \Kendo\Dataviz\UI\RadialGaugeScale $value
    */
    public function scale(\Kendo\Dataviz\UI\RadialGaugeScale $value) {
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
