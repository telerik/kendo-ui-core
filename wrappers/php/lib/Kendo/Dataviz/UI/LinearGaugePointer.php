<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointer extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\LinearGaugePointerBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

    public function size($value) {
        return $this->setProperty('size', $value);
    }

    public function track(\Kendo\Dataviz\UI\LinearGaugePointerTrack $value) {
        return $this->setProperty('track', $value);
    }

    public function value($value) {
        return $this->setProperty('value', $value);
    }

//<< Properties
}

?>
