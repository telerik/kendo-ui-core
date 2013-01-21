<?php

namespace Kendo\Dataviz\UI;

class LinearGaugePointerTrack extends \Kendo\SerializableObject {
//>> Properties

    public function setBorder(\Kendo\Dataviz\UI\LinearGaugePointerTrackBorder $value) {
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
