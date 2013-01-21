<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLine extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
