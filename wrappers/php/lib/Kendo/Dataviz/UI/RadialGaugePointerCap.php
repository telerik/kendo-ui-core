<?php

namespace Kendo\Dataviz\UI;

class RadialGaugePointerCap extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function size($value) {
        $this->setProperty('size', $value);

        return $this;
    }

//<< Properties
}

?>
