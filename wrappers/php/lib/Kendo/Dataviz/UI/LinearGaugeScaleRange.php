<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScaleRange extends \Kendo\SerializableObject {
//>> Properties

    public function from($value) {
        return $this->setProperty('from', $value);
    }

    public function to($value) {
        return $this->setProperty('to', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

//<< Properties
}

?>
