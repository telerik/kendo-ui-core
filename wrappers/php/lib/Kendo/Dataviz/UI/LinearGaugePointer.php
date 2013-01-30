<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointer extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of the pointer.
    * @param \Kendo\Dataviz\UI\LinearGaugePointerBorder|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The color of the pointer.
    * @param string $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The margin of the pointer.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The opacity of the pointer.
Any valid CSS color string will work here, including hex and rgb.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The shape of the pointer.
    * @param string $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

    /**
    * The size of the pointer.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The element arround/under the pointer.
(available only for 'barIndicator' shape)
    * @param \Kendo\Dataviz\UI\LinearGaugePointerTrack|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function track($value) {
        return $this->setProperty('track', $value);
    }

    /**
    * The value of the gauge.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointer
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
