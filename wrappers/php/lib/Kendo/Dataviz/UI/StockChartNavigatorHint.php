<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorHint extends \kendo\SerializableObject {
//>> Properties

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function format($value) {
        $this->setProperty('format', $value);

        return $this;
    }

//<< Properties
}

?>
