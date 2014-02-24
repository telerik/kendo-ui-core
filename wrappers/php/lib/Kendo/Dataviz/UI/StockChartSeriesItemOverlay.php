<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemOverlay extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The gradient name.Available options:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemOverlay
    */
    public function gradient($value) {
        return $this->setProperty('gradient', $value);
    }

//<< Properties
}

?>
