<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointer extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\LinearGaugePointerBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function margin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function shape($value) {
        $this->setProperty('shape', $value);

        return $this;
    }

    public function size($value) {
        $this->setProperty('size', $value);

        return $this;
    }

    public function track(\Kendo\Dataviz\UI\LinearGaugePointerTrack $value) {
        $this->setProperty('track', $value);

        return $this;
    }

    public function value($value) {
        $this->setProperty('value', $value);

        return $this;
    }

//<< Properties
}

?>
