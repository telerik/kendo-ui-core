<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScaleRange extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The start position of the range in scale units.
    * @param float $value
    */
    public function from($value) {
        return $this->setProperty('from', $value);
    }

    /**
    * The end position of the range in scale units.
    * @param float $value
    */
    public function to($value) {
        return $this->setProperty('to', $value);
    }

    /**
    * The opacity of the range.
    * @param float $value
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The color of the range.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

//<< Properties
}

?>
