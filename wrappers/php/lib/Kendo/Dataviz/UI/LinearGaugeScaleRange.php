<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeScaleRange extends \Kendo\SerializableObject {
//>> Properties

    public function setFrom($value) {
        $this->setProperty('from', $value);

        return $this;
    }

    public function setTO($value) {
        $this->setProperty('to', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

//<< Properties
}

?>
