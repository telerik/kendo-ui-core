<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScaleMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function size($value) {
        return $this->setProperty('size', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
