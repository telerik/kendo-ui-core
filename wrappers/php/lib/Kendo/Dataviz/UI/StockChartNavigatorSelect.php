<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSelect extends \Kendo\SerializableObject {
//>> Properties

    public function setFrom($value) {
        $this->setProperty('from', $value);

        return $this;
    }

    public function setTO($value) {
        $this->setProperty('to', $value);

        return $this;
    }

//<< Properties
}

?>
