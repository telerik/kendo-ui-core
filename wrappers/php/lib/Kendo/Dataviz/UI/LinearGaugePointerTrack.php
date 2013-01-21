<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointerTrack extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\LinearGaugePointerTrackBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function size($value) {
        return $this->setProperty('size', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
