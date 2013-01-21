<?php

namespace Kendo\Dataviz\UI;

class StockChartPaneBorder extends \Kendo\SerializableObject {
//>> Properties

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setDashType($value) {
        $this->setProperty('dashType', $value);

        return $this;
    }

    public function setWidth($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
