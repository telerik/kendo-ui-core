<?php

namespace kendo\dataviz\ui;

class StockChartNavigatorSelect extends \kendo\SerializableObject {
//>> Properties

    public function setFrom($value) {
        $this->setProperty('from', $value);

        return $this;
    }

    public function setTo($value) {
        $this->setProperty('to', $value);

        return $this;
    }

//<< Properties
}

?>
