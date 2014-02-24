<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScaleRange extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The start position of the range in scale units.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScaleRange
    */
    public function from($value) {
        return $this->setProperty('from', $value);
    }

    /**
    * The end position of the range in scale units.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScaleRange
    */
    public function to($value) {
        return $this->setProperty('to', $value);
    }

    /**
    * The opacity of the range.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScaleRange
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The color of the range.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\LinearGaugeScaleRange
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

//<< Properties
}

?>
