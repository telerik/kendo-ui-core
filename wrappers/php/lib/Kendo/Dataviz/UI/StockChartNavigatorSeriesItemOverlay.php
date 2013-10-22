<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemOverlay extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The gradient name.Available options:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemOverlay
    */
    public function gradient($value) {
        return $this->setProperty('gradient', $value);
    }

//<< Properties
}

?>
