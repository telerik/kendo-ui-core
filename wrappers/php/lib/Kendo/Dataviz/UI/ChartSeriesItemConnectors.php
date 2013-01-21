<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemConnectors extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
