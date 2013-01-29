<?php

namespace Kendo\Dataviz\UI;

class RadialGaugePointerCap extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the cap.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\RadialGaugePointerCap
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The size of the cap in percents. (from 0 to 1)
    * @param float $value
    * @return \Kendo\Dataviz\UI\RadialGaugePointerCap
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

//<< Properties
}

?>
