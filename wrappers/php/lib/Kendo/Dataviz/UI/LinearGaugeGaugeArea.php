<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeGaugeArea extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background of the gauge area.
Any valid CSS color string will work here, including hex and rgb.
    * @param  $value
    * @return \Kendo\Dataviz\UI\LinearGaugeGaugeArea
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the gauge area.
    * @param \Kendo\Dataviz\UI\LinearGaugeGaugeAreaBorder|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugeGaugeArea
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The height of the gauge area.  By default, the vertical gauge is 200px and
the horizontal one is 60px.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeGaugeArea
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * The margin of the gauge area.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\LinearGaugeGaugeArea
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The width of the gauge area.  By default the vertical gauge is 60px and
horizontal gauge is 200px.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugeGaugeArea
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
