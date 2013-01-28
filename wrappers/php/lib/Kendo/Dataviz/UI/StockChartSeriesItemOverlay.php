<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemOverlay extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The gradient name.Available options:
    * @param string $value
    */
    public function gradient($value) {
        return $this->setProperty('gradient', $value);
    }

//<< Properties
}

?>
