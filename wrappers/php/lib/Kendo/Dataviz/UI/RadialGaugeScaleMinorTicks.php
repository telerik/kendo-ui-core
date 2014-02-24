<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeScaleMinorTicks extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the minor ticks.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The minor tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the minor ticks.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the minor ticks.
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugeScaleMinorTicks
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
