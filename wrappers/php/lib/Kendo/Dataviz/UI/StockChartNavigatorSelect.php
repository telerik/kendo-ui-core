<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSelect extends \Kendo\SerializableObject {
//>> Properties

    public function from($value) {
        return $this->setProperty('from', $value);
    }

    public function to($value) {
        return $this->setProperty('to', $value);
    }

//<< Properties
}

?>
