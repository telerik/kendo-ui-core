<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItemMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    public function size($value) {
        return $this->setProperty('size', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
