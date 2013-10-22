<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border.  It defaults to the color of the current series.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the border.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemBorder
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The width of the border.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
