<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeGaugeArea extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\RadialGaugeGaugeAreaBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function height($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function margin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function width($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
