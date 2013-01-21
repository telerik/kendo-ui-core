<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointerTrack extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\LinearGaugePointerTrackBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

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

//<< Properties
}

?>
