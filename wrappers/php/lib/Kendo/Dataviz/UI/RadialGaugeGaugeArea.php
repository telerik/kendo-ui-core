<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeGaugeArea extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background of the gauge area.
Any valid CSS color string will work here, including hex and rgb.
    * @param Object $value
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the gauge area.
    * @param \Kendo\Dataviz\UI\RadialGaugeGaugeAreaBorder $value
    */
    public function border(\Kendo\Dataviz\UI\RadialGaugeGaugeAreaBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The height of the gauge area.
    * @param float $value
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The margin of the gauge area.
    * @param float|Object $value
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The width of the gauge area.
    * @param float $value
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
