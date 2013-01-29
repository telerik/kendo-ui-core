<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemTooltipBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemTooltipBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The width of the border.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemTooltipBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
