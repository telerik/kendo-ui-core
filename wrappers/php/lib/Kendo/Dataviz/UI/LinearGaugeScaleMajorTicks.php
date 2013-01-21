<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScaleMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function size($value) {
        $this->setProperty('size', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function width($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
