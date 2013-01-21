<?php

namespace Kendo\Dataviz\UI;

class StockChartXAxisItemMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    public function size($value) {
        $this->setProperty('size', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
