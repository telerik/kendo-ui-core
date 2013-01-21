<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemConnectors extends \Kendo\SerializableObject {
//>> Properties

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setPadding($value) {
        $this->setProperty('padding', $value);

        return $this;
    }

    public function setWidth($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
