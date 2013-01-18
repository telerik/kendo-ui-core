<?php

namespace kendo\dataviz\ui;

class RadialGaugePointer extends \kendo\SerializableObject {
//>> Properties

    public function setCap(\kendo\dataviz\ui\RadialGaugePointerCap $value) {
        $this->setProperty('cap', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setValue($value) {
        $this->setProperty('value', $value);

        return $this;
    }

//<< Properties
}

?>
