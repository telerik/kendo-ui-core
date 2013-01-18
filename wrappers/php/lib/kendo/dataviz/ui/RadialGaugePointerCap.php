<?php

namespace kendo\dataviz\ui;

class RadialGaugePointerCap extends \kendo\SerializableObject {
//>> Properties

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setSize($value) {
        $this->setProperty('size', $value);

        return $this;
    }

//<< Properties
}

?>
