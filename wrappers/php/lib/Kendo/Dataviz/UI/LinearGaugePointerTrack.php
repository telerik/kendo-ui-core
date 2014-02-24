<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointerTrack extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The border of the track.
    * @param \Kendo\Dataviz\UI\LinearGaugePointerTrackBorder|array $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointerTrack
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The color of the track.
    * @param string $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointerTrack
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The opacity of the track.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointerTrack
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The size of the track.
    * @param float $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointerTrack
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The visibility of the track.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\LinearGaugePointerTrack
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
