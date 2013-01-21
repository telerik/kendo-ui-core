<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorHint extends \kendo\SerializableObject {
//>> Properties

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

    public function format($value) {
        return $this->setProperty('format', $value);
    }

//<< Properties
}

?>
