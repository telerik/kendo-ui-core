<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointerTrack extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of the track.
    * @param \Kendo\Dataviz\UI\LinearGaugePointerTrackBorder $value
    */
    public function border(\Kendo\Dataviz\UI\LinearGaugePointerTrackBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The color of the track.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the track.
    * @param float $value
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The size of the track.
    * @param float $value
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the track.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
