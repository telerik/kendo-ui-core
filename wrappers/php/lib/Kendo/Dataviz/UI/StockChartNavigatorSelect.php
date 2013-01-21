<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSelect extends \Kendo\SerializableObject {
//>> Properties

    public function from($value) {
        $this->setProperty('from', $value);

        return $this;
    }

    public function to($value) {
        $this->setProperty('to', $value);

        return $this;
    }

//<< Properties
}

?>
