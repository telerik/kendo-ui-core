<?php

namespace Kendo\Dataviz\UI;

class RadialGaugePointer extends \Kendo\SerializableObject {
//>> Properties

    public function cap(\Kendo\Dataviz\UI\RadialGaugePointerCap $value) {
        $this->setProperty('cap', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function value($value) {
        $this->setProperty('value', $value);

        return $this;
    }

//<< Properties
}

?>
