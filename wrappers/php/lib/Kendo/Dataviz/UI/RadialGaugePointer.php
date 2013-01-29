<?php

namespace Kendo\Dataviz\UI;

class RadialGaugePointer extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The cap configuration options.
    * @param \Kendo\Dataviz\UI\RadialGaugePointerCap $value
    * @returns \Kendo\Dataviz\UI\RadialGaugePointer
    */
    public function cap(\Kendo\Dataviz\UI\RadialGaugePointerCap $value) {
        return $this->setProperty('cap', $value);
    }

    /**
    * The color of the pointer.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\RadialGaugePointer
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The value of the gauge.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\RadialGaugePointer
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
