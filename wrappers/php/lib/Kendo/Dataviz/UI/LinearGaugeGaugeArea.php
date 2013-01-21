<?php

namespace Kendo\Dataviz\UI;

class LinearGaugeGaugeArea extends \Kendo\SerializableObject {
//>> Properties

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setBorder(\Kendo\Dataviz\UI\LinearGaugeGaugeAreaBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setHeight($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function setMargin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function setWidth($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
