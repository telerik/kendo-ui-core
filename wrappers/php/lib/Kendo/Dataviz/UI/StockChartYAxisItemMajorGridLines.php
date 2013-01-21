<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItemMajorGridLines extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
