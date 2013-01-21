<?php

namespace Kendo\Dataviz\UI;

class RadialGaugePointer extends \Kendo\SerializableObject {
//>> Properties

    public function cap(\Kendo\Dataviz\UI\RadialGaugePointerCap $value) {
        return $this->setProperty('cap', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
