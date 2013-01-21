<?php

namespace Kendo\Dataviz\UI;

class StockChartYAxisItemMajorTicks extends \Kendo\SerializableObject {
//>> Properties

    public function setSize($value) {
        $this->setProperty('size', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
