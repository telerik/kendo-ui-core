<?php

namespace kendo\dataviz\ui;

class LinearGaugePointerTrack extends \kendo\SerializableObject {
//>> Properties

    public function setBorder(\kendo\dataviz\ui\LinearGaugePointerTrackBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function setSize($value) {
        $this->setProperty('size', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
