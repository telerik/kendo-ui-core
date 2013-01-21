<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemOverlay extends \Kendo\SerializableObject {
//>> Properties

    public function gradient($value) {
        $this->setProperty('gradient', $value);

        return $this;
    }

//<< Properties
}

?>
