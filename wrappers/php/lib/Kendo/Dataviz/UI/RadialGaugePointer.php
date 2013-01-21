<?php

namespace Kendo\Dataviz\UI;

class RadialGaugePointer extends \Kendo\SerializableObject {
//>> Properties

    public function setCap(\Kendo\Dataviz\UI\RadialGaugePointerCap $value) {
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
